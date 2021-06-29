#THIS PACKAGE IS IN BETA VERSION USE AT YOUR OWN RISK

<br>
<br>
<br>
<br>
<br>
<br>
<br>

# What is 'mysq-glob-economy'

It is a global economy package that allows you to create, delete, edit data for the user and much more

# Why mysql-glob-economy?

- Easy to use
- Uses MySQL database which is encrypted
- Provides a global economy system
- Has a bank system
- Has a bank limit

# Setting up

Here is the basic code to connect to your mysq database

```js
const { setDatabase } = require("mysq-glob-economy"); //requireing the package
var dbOptions = {
    host: 'localhost', // location of your mysql database host
    user: 'root', // Login to your mysql database
    pass: '1234QWERTY', // Password to your mysql database
    database: 'mysql-glob-economy', //Optional field with name of your database
}

setDataBase(dbOptions);
```

Fill up `dbOptions` with your mysql database credentials and settings

# Examples

_Examples assume that you have setted up the module as presented in 'Setting Up' section._
_Following examples assume that your `Discord.Client` is called `client`._

_Following examples assume that your `client.on("message", message` is called `message`._

_Following example contains isolated code which you need to integrate in your own message event._

_Following example assumes that you are able to write asynchronous code (the one using `async/await`)._

- **Increasing the value of bank limit by a bit each time the author sends a message**

```js
const { findUser, createProfile, incBankLimit } = require("mysql-glob-economy");

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const randomValue = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
  const user = await findUser(message.author.id);
  if (!user) return await createProfile(message.author.id); //using this function to create the profile if one dosnt have 1 alredy

  if (user) return await incBankLimit(message.author.id, randomValue); //using the function to inc bank limit
});
```

- **Bal command**

```js
const {
  findUser,
  getBalance,
} = require("mysql-glob-economy");
const Discord = require("discord.js");


const target = message.mentions.members.first() || message.member;
const user = await findUser(target.id);

if (!user) return message.channel.send("You dont have a profile, create one to start earning currency");

const userData = await getBalance(target.id);

const embed = new Discord.MessageEmbed()
.setTitle("Balance")
.addFields(
  {
    name: "wallet",
    value: userData,
  },
  {
    name: "bank",
    value: bankCoins + "/" + bankLimit,
  }
);

message.channel.send(embed);
```

_Time for you to get creative_


# Functions

**In the following list of functions `< >` are used for mandatory parameters and `[ ]` are used for optional parameters**
<br>
<br>

**setDataBase**
Function used to create pool with database connections
<br>

```js
economy.setDataBase(<dbOptions: object>);
```

**generateTables**<br>
Function that generates tables if they do not exist, run with setDataBase
<br>

```js
economy.genTable([tableName: string])
```

**dropTables**<br>
Function that removes tables if they do exist, suggested is to use generateTables afterwards as no Table will cause errors
<br>
**__!!! USE WITH CAUTION !!!__**

```js
economy.dropTable([tableName: string])
```

**findUser**<br>
Function to check if there is an entry with that user
<br>

```js
eceonomy.findUser(<userID: string>);
```

**createProfile**<br>
Function to create user profile
<br>

```js
economy.createProfile(<userID: string>);
```

**deleteProfile**<br>
Function to delete user profile
<br>

```js
economy.deleteProfile(<userID: string>)
```

**getBalance**<br>
Function that gets user data such such as pocket or bank balance, alongside with bank limit
<br>

```js
economy.getBalance(<userID: string>)
```


**updateUserData**<br>
Function that updates user data such such as pocket or bank balance, alongside with bank limit
<br>
<table><tbody><tr><th>Action</th><th>Other Accepted Values</th><th>Effect</th></tr><tr><td>Increase</td><td>1, increase, add, inc, gain, growth, profit, accession</td><td>Increases by submitted value</td></tr><tr><td>Decrease</td><td>2, decrease, remove, substract, sub, dec, rem, reduction, reduce, red</td><td>Substracts by submitted value</td></tr></tbody></table>
<br>

```js
economy.updateUserData(<userID: string>, )
```