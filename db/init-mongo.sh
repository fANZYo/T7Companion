#!/bin/bash

mongoimport --db t7api --collection characters --jsonArray --file ./characters.json
mongoimport --db t7api --collection movelist --jsonArray --file ./movelist.json
