---
layout: post
title: Common mistakes I made while using Nginx
subtitle: 
date: 2021-07-19
categories: [programming, deployment]
---

These are a couple frequent mistakes that I made while working on Nginx. These are caused because `apache2` is present by default in most of the ubuntu servers.

## 1. Forgetting to Disable apache2 

Sometimes, when you try to restart/start `nginx`, using `sudo service nginx (re)start`, you see the following error

![error when u try to restart](https://imgur.com/Aa88NvW.png)

If you check the logs at `var/logs/nginx/error.log` file, it says something like this

![error log](https://imgur.com/w5ua6cL.png)

Nginx job is to listen to port 80, but when you tried to restart it, it failed because it was already being listened by some other process.  To see, who is listening at port 80, use the command `sudo lsof -i :80`, and you see that `apache2` is the criminal! It was apache2, who was listening to the 80, preventing nginx from listening to the port. You can't have 2 web servers listening at the same port 80.

![apache2 is the criminal](https://imgur.com/7PvTFHl.png)

**Where did apache2 come from?**

`apache2` is installed by default in most of the Ubuntu servers. And when the machine boots, the services start in the alphabetical order. Since `apache2` comes before `nginx` alphabetically, apache2 gets hold of the port 80. 

**Solution:** Disable `apache2`, so that it never start automatically on its own when you reboot your server. To do that,

1. Stop `apache2` - `sudo service apache2 stop`
2. Disable using `systemctl` - `sudo systemctl disable apache2`

Now you can start nginx successfully

![nginx running](https://imgur.com/ANypnS9.png)

**Suggestion**: Since mostly Ubuntu servers have apache2 enabled by default, soon after you have spun your instance you can disable `apache2` to avoid any troubles in future.

## 2. Unlinking the default page

You have your nginx configuration in a separate file,say `your-domain.com`, (which is a popular practice) in `/etc/nginx/sites-available`. But when you visit the site, it shows the `Ubuntu default page` something like this

![ubuntu default page](https://imgur.com/c74tL09.png)

This is because the configuration in `default` file in `/etc/nginx/sites-available` is given priority over your configuration, which is written in separate file. To disable the `Ubunut default page`, you can simply remove the symlink of `default` using `unlink` in `/etc/nginx/sites-enabled` directory using - `sudo unlink /etc/nginx/sites-available/default`.





