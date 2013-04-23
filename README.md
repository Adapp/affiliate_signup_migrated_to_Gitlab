Custom Affiliate Signup Form Generator
=======================================

An angularjs app build on node.js which allows for the entering of custom text into an affiliate sign up form. The editor provides a live preview of the content to be generated. Once the user submits the custom content they nodejs server compiles an html and javascript template with the custom information. These compiled files as well as relevant css and javascript files are packaged into a zip file and returned to the user.
The user only needs to unzip the file and navigate to it's index.html folder for a fully functioning sign up form.


Known Limits/Future fixes
-------------------
    -Generated zip does not open with the Mac OSX archive utility. Must unzip from the terminal.
    -Language cannot be flipped to RTL.
    -Character encoding does not modify based on input language, only an issue for translation programs.
    -Does not support custom questions on the form.
    -Error messages returned from the server are untranslated.
    -All input is html escaped.

Install
========
- npm install
- npm start
