> Node dependencies are not installing!

Check the permissions of your folder and if you're the owner of it. Only as last resort try running as sudo:
```
sudo npm install
```
---

> Bower dependencies are not installing!

The `git` protocol may be blocked on your network, try changing your global settings to use `https` instead:
```
git config --global url."https://".insteadOf git://
``` 
