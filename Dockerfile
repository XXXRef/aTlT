#Choose base image
FROM node:latest

#Add metadata
LABEL "repository"="https://github.com/XXXRef/aTlT"
LABEL "maintainer"="XXXRef"
LABEL "website"="https://xxxref.com/"

#Set working directory
WORKDIR /www/atlt

#Place app files into image
COPY ./src /www/atlt

#Install node modules
RUN ["npm","install"]

#run app
CMD ["node", "main.js"]