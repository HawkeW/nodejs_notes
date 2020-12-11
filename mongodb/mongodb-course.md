### What is the MongoDB Datebase
- NoSQL: It does not utilize tables, rows and columns to organize data
- Datebase: It uses a structured way to store and access data

### Document VS Collection
#### Document
A way to organize and store data as a set of field-value pairs
```js
{
	<field>:<value>,
	<field>:<value>,
	"name": "Lakshmi",
	"title": "Team Lead",
	"age": 26
}
```
#### Collection
An organized store of documents in MongoDB, usually with common fields between documents
- A document will contain many documents
- A databse will contain multiple collections

### Atlas 
MongoDB is used at the core of Atlas for data storage and retrieval

Clusters are groups of servers that store data
Replica Sets are a set of a few connected mongodb instances that store the same data

### Create and Deploy an Atlas Cluster

0. [Sign-up](https://www.mongodb.com/university-signup) and [Sign in](https://cloud.mongodb.com/v2#/preferences/organizations) **MongoDB University**
1. **Create an Organization**
