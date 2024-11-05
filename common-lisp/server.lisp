(in-package #:todo-wizard)

(defvar *server* nil "Holds the Hunchentoot server instance")
(defvar *static-directory* 
  (merge-pathnames #P"public/"
                   (asdf:system-source-directory :todo-wizard))
  "Directory containing static resources")

(defvar *users* (make-hash-table :test #'equal) 
  "Simple in-memory storage for users. In production, use a proper database.")

(defun nav-link (uri text)
  (format nil "<a href='~A' class='nav-link'>~A</a>" uri text))

(defun user-login-link ()
  (if (hunchentoot:session-value :user-email)
      (format nil "<a href='/logout/' class='btn btn-outline-light'>Logout</a>")
      (format nil "<a href='/login/' class='btn btn-outline-light'>Login</a>")))

(defun page-header ()
  (format nil "<header>
	<nav class='navbar navbar-expand-lg navbar-dark bg-primary shadow-sm'>
		<div class='container content-width'>
			<a class='navbar-brand' href='/'>ToDo Wizard</a>
			
			<button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
				<span class='navbar-toggler-icon'></span>
			</button>
			
			<div class='collapse navbar-collapse' id='navbarNav'>
				<ul class='navbar-nav ms-auto'>
					<li class='nav-item'>
						~A
					</li>
					<li class='nav-item'>
						~A
					</li>
					<li class='nav-item'>
						~A
					</li>
					<li class='nav-item ms-lg-2'>
						~A
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>" (nav-link "/" "Home")
(nav-link "/about/" "About")
(nav-link "/contact/" "Contact")
(user-login-link)))

(defun page-footer ()
  "<footer class='footer mt-auto py-4 bg-light'>
	<div class='container content-width'>
		<div class='row'>
			<div class='col-md-6 text-center text-md-start'>
				<p class='text-muted mb-0'>&copy; <?= date('Y') ?> - Ben</p>
			</div>
			<div class='col-md-6 text-center text-md-start'>
				
			</div>
		</div>
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
    (content-about)))

(defun handle-contact ()
  (setf (hunchentoot:content-type*) "text/html")
  (render-page 
    "ToDo Wizard"
    (content-contact)))

(defun content-login (&optional error-message)
  (format nil "<main class='flex-shrink-0'>
<section class='py-5'>
	<div class='container' style='max-width: 1140px'>
		<div class='row justify-content-center'>
			<div class='col-lg-8'>
				<div class='text-center mb-4'>
					<h1 class='fw-bold'>Login</h1>
					<p class='text-muted'>Welcome back to ToDo Wizard</p>
				</div>
				~A
				<div class='card border-0 shadow-sm'>
					<div class='card-body p-4 p-md-5'>
						<form action='/login/' method='post'>
							<div class='row g-4'>
								<div class='col-12'>
									<label for='loginEmail' class='form-label'>Email</label>
									<input type='email' class='form-control form-control-lg' id='loginEmail' name='email' 
										value='' required>
								</div>
								<div class='col-12'>
									<label for='loginPassword' class='form-label'>Password</label>
									<input type='password' class='form-control form-control-lg' id='loginPassword' name='password' 
										value='' required>
								</div>
								<div class='col-12'>
									<button type='submit' class='btn btn-primary btn-lg w-100'>Login</button>
								</div>
								<div class='col-12 text-center'>
									<p class='mb-0 text-muted'>Don't have an account? <a href='/register/' class='text-decoration-none'>Create one</a></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</main>"
          (if error-message
              (format nil "<div class='alert alert-danger'>~A</div>" error-message)
              "")))

(defun handle-login ()
  (setf (hunchentoot:content-type*) "text/html")
  ;; First check if user is already logged in
  (if (hunchentoot:session-value :user-email)
      (render-page "Login - ToDo Wizard"
                  (content-login "You are already logged in"))
      ;; Not logged in, proceed with normal login flow
      (if (string= (hunchentoot:request-method*) "POST")
          ;; Handle POST request (form submission)
          (let* ((email (hunchentoot:post-parameter "email"))
                 (password (hunchentoot:post-parameter "password"))
                 (user (gethash email *users*)))
            (cond
              ((or (string= email "") (null email))
               (render-page "Login - ToDo Wizard"
                           (content-login "Email is required")))
              ((or (string= password "") (null password))
               (render-page "Login - ToDo Wizard"
                           (content-login "Password is required")))
              ((null user)
               (render-page "Login - ToDo Wizard"
                           (content-login "Invalid email or password")))
              ((not (string= (getf user :password) (hash-password password)))
               (render-page "Login - ToDo Wizard"
                           (content-login "Invalid email or password")))
              (t
               ;; Login successful, set session and redirect
               (let ((session (hunchentoot:start-session)))
                 (setf (hunchentoot:session-value :user-email session) email)
                 (hunchentoot:redirect "/")))))
      ;; Handle GET request (show form)
      (render-page "Login - ToDo Wizard"
                  (content-login)))))

(defun content-register (&optional error-message)
  (format nil "<main class='flex-shrink-0'>
<section class='py-5'>
	<div class='container' style='max-width: 1140px'>
		<div class='row justify-content-center'>
			<div class='col-lg-8'>
				<div class='text-center mb-4'>
					<h1 class='fw-bold'>Create Account</h1>
					<p class='text-muted'>Join ToDo Wizard and start organizing your tasks today</p>
				</div>
				~A
				<div class='card border-0 shadow-sm'>
					<div class='card-body p-4 p-md-5'>
						<form action='/register/' method='post'>
							<div class='row g-4'>
								<div class='col-12'>
									<label for='registerEmail' class='form-label'>Email</label>
									<input type='email' class='form-control form-control-lg' id='registerEmail' name='email' 
										value='' required>
								</div>
								<div class='col-12'>
									<label for='registerPassword' class='form-label'>Password</label>
									<input type='password' class='form-control form-control-lg' id='registerPassword' name='password' 
										value='' required>
								</div>
								<div class='col-12'>
									<label for='registerPasswordConfirm' class='form-label'>Confirm Password</label>
									<input type='password' class='form-control form-control-lg' id='registerPasswordConfirm' name='passwordConfirm' 
										value='' required>
								</div>
								<div class='col-12'>
									<button type='submit' class='btn btn-primary btn-lg w-100'>Create Account</button>
								</div>
								<div class='col-12 text-center'>
									<p class='mb-0 text-muted'>Already have an account? <a href='/login/' class='text-decoration-none'>Sign in</a></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
</main>"
          (if error-message
              (format nil "<div class='alert alert-danger'>~A</div>" error-message)
              "")))

(defun handle-register ()
  (setf (hunchentoot:content-type*) "text/html")
  ;; First check if user is already logged in
  (if (hunchentoot:session-value :user-email)
      (render-page "Register - ToDo Wizard"
                  (content-register "You are already logged in"))
      ;; Not logged in, proceed with normal registration flow
      (if (string= (hunchentoot:request-method*) "POST")
          ;; Handle POST request (form submission)
          (let* ((email (hunchentoot:post-parameter "email"))
                 (password (hunchentoot:post-parameter "password"))
                 (password-confirm (hunchentoot:post-parameter "passwordConfirm")))
            (cond
              ((or (string= email "") (null email))
               (render-page "Register - ToDo Wizard"
                           (content-register "Email is required")))
              ((or (string= password "") (null password))
               (render-page "Register - ToDo Wizard"
                           (content-register "Password is required")))
              ((not (string= password password-confirm))
               (render-page "Register - ToDo Wizard"
                           (content-register "Passwords do not match")))
              ((gethash email *users*)
               (render-page 2"Register - ToDo Wizard"
                           (content-register "Email already registered")))
              (t
               ;; Store the new user and redirect to login
               (setf (gethash email *users*)
                     (list :password (hash-password password) ;; You'll need to implement hash-password
                           :created-at (get-universal-time)))
               (hunchentoot:redirect "/login/"))))
      ;; Handle GET request (show form)
      (render-page "Register - ToDo Wizard"
                  (content-register)))))

(defun hash-password (password)
  "Placeholder for password hashing. In production, use a proper crypto library."
  ;; TODO: Implement proper password hashing (e.g., with ironclad)
  password)

(defun handle-logout ()
  ;; Remove the session
  (hunchentoot:remove-session hunchentoot:*session*)
  ;; Redirect to home page
  (hunchentoot:redirect "/"))

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
  ;; Add our route handlers
  (push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/contact/")
                 #'handle-contact)))
        hunchentoot:*dispatch-table*)
  (push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/about/")
                 #'handle-about)))
        hunchentoot:*dispatch-table*)
  (push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/login/")
                 #'handle-login)))
        hunchentoot:*dispatch-table*)
	(push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/register/")
                 #'handle-register)))
        hunchentoot:*dispatch-table*)
  (push (lambda (request)
          (let ((uri (hunchentoot:script-name request)))
            (and (string= uri "/logout/")
                 #'handle-logout)))
        hunchentoot:*dispatch-table*)
  ;; Add index handler last
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
