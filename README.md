# PyInABox
Server-side-shell implemented on top of Divmod's Athena LivePage an python-vte with minimal ncurses support.

By default the vte runs the command login in a loop, then exits.  It is possible to run other commands, or set up a chroot in the vte before giving control to the user, but remember it runs on the server, so is a potential security hole.  Add authentication as appropriate.
