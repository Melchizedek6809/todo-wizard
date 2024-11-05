#!/bin/sh
sbcl --eval '(ql:quickload :todo-wizard)' --eval '(todo-wizard:start-blocking)' --quit
