#!/bin/bash
mongoexport --db=goldenIdeas --collection=projects \
    --fields=name,likes,category,technology,size,owner,startDate,endDate,email,github,description \
    --out=./snapshot.json
