(defpackage #:todo-wizard
  (:use #:cl)
  (:export
   #:todo-wizard-start
   #:todo-wizard-stop))
(in-package #:todo-wizard)

(defun todo-wizard-start ()
  "Start the ToDo Wizard HTTP Server"
  (format T "Starting ToDo Wizard%%"))

(defun todo-wizard-stop ()
  "Stop the ToDo Wizard HTTP Server"
  (format T "Stopping ToDo Wizard%%"))
