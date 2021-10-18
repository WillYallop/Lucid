# WillPress

## Local Setup

Once you have configured you .env file with the DOMAIN field. Youll want to get the running locally on your machine. Run ```npm run dev``` for this (notice the IP will be logged).

> Only change the PORT in the .env file if necessary.

Now it is running, you will want to point the IP that was logged, to the domain you specified in the .env. To do this run ```sudo nano /etc/hosts``` on mac to edit your hosts file. This may differ on windows. Now you are in your hosts file paste the following:

```
192.168.1.103 willpress.local
192.168.1.103 admin.willpress.local
192.168.1.103 assets.willpress.local
192.168.1.103 api.willpress.local
```
> Obviosuly swap out the IP and DOMAIN specific to your environment.