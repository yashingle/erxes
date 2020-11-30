ARG BASE_IMAGE
FROM $BASE_IMAGE
WORKDIR /erxes-api/

# RUN chown -R node:node /erxes-api
# COPY --chown=node:node . /erxes-api

RUN apt-get update \
    && apt-get install curl \
    && apt-get install vim

# USER node
EXPOSE 3300
ENTRYPOINT [ "node", "--max_old_space_size=8192", "dist" ]
