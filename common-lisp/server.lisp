(in-package #:todo-wizard)

(defvar *server* nil "Holds the Hunchentoot server instance")
(defvar *static-directory* 
  (merge-pathnames #P"public/"
                   (asdf:system-source-directory :todo-wizard))
  "Directory containing static resources")

(defun page-header ()
  "<header class='bg-dark text-white py-3'>
    <div class='container'>
      <h1>ToDo Wizard</h1>
    </div>
  </header>")

(defun page-footer ()
  "<footer class='bg-dark text-white py-3'>
    <div class='container'>
      <p>&copy; 2024 ToDo Wizard</p>
    </div>
  </footer>")

(defun render-page (title content)
  "Renders the standard page template with the given content in the body"
  (format nil "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='description' content='<?= $description ?>'>
    <title>~A</title>
    <link rel='stylesheet' href='/res/bootstrap/css/bootstrap.min.css'>
    <script src='/res/bootstrap/js/bootstrap.min.js' defer></script>

    <link rel='stylesheet' href='/res/main.css'>
    <script src='/res/main.js' defer></script>
</head>
<body class='d-flex flex-column min-vh-100'>
    ~A
    ~A
    ~A
</body>
</html>" title (page-header) content (page-footer)))

(defun handle-index ()
  (setf (hunchentoot:content-type*) "text/html")
  (render-page 
    "ToDo Wizard"
    (content-index)))

(defun handle-about ()
  (setf (hunchentoot:content-type*) "text/html")
  (render-page 
    "ToDo Wizard"
    (content-index)))

(defun todo-wizard-start ()
  "Start the ToDo Wizard HTTP Server"
  (when *server*
    (todo-wizard-stop))
  (setf *server* 
        (make-instance 'hunchentoot:easy-acceptor 
                      :port 8080
                      :document-root *static-directory*))
  ;; Clear existing dispatch table
  (setf hunchentoot:*dispatch-table* nil)
  ;; Add the static file dispatcher first
  (push (hunchentoot:create-folder-dispatcher-and-handler 
         "/" *static-directory*)
        hunchentoot:*dispatch-table*)
  ;; Add fallback handler for index
  (push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/")
                 #'handle-index)))
        hunchentoot:*dispatch-table*)
  (hunchentoot:start *server*)
  (format t "ToDo Wizard started on port 8080~%Serving static files from ~A~%" *static-directory*))

(defun stop ()
  "Stop the ToDo Wizard HTTP Server"
  (when *server*
    (hunchentoot:stop *server*)
    (setf *server* nil))
  (format t "ToDo Wizard stopped~%"))

(defun start-blocking ()
  "Start the ToDo Wizard HTTP Server and block until interrupted"
  (todo-wizard-start)
  (format t "Server running. Press Ctrl+C to stop.~%")
  (handler-case 
      (loop (sleep 1))
    (sb-sys:interactive-interrupt ()
      (progn
        (format t "~%Shutting down...~%")
        (stop)))))
