#!/bin/bash
mongoimport --db=goldenIdeas --collection=projects --file=./snapshot.json
