# B.O.S.S. Terminal Guide

This is a user guide for the B.O.S.S. Terminal.

## Index
- [Commands](#commands)

## Commands

- `clear` - clears the screen

- `cls` - alias for `clear`

- `pwd` - shows the present/current working directory

- `ls` - lists all the files and the folders in the current working directory

- `touch` - creates new file(s) with the given names
```
$ > touch file_name
$ > touch file1 file2 file3
$ > touch "filename w space" "file 2"
```

- `mkdir` - creates new folder(s) / directory(ies) with the given names
```
$ > touch dir_name
$ > touch folder1 folder2 folder3
$ > touch "dir-name w space" "folder 2"
```

- `md` - an alias for `mkdir`

- `cd` - change directory 
```
$ > cd /dir1
---
# Since "/dir1" is an absolute path, this will take us inside "dir1" directory under the root /
---


$ > cd dir2
---
# Since this is a relative path, this will get translated to "/path_to_current_dir / dir2"
---
```
