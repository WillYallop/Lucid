# LucidCMS

## Getting Started

Before you can start your journey with LucidCMS, there are a couple of essential steps you need to follow. These are as listed:

- Configure the .env file
- Build the project
- [Configure your hosts file](#configure-your-hosts-file)

### Configure the .env file

First things first. You'll notice there is a ```.env.example``` file in the root directory. Copy the contents on this, create a new ```.env``` file and paste your clipboard into it. Fill out the environments as labelled.

### Build the project

LucidCMS out of the box comes not built. This is mainly to stop repo clutter and size. Because of this, to be able to get started you must run the generate command. This will create the ```./core/modules/dist``` dist folder, along with the ```./dist``` folder. You can this with the following command.

``` 
npm run generate
```

This generate command runs the following:

```
npm run generate:modules
npm run generate:cms
npm run generate:app
```

### Configure your hosts file

Once you have configured you .env file with the DOMAIN field and ran the build commands, youll want to get the running locally on your machine. Run ```npm run dev``` for this (notice the IP will be logged).

> Only change the PORT in the .env file if necessary.

Now it is running, you will want to point the IP that was logged, to the domain you specified in the .env. To do this run ```sudo nano /etc/hosts``` on mac to edit your hosts file. This may differ on windows. Now you are in your hosts file paste the following:

```
192.168.1.103 lucid.local
192.168.1.103 admin.lucid.local
192.168.1.103 assets.lucid.local
192.168.1.103 api.lucid.local
```
> Swap out the IP and DOMAIN specific to your environment.