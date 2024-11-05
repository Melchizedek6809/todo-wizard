(defsystem todo-wizard
  :name "Todo-Wizard"
  :version "0.0.1"
  :license "mit"
  :author "Ben <ben@wolkenwelten.net>"
  :maintainer "Ben <ben@wolkenwelten.net>"
  :description "Simple ToDo WebApp, trying to see how good LLMs are at writing Lisp"
  :serial T
  :components (
    (:file "todo-wizard")
    (:file "page-content")
    (:file "server"))
  :depends-on (:hunchentoot))
