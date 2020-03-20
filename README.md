# corona_localisation_pusher
Pushing Localisation Data to an Elastic Search endpoint.


Follow the configuration structure in elastic_config_example.json, autobahn_config_example.json, and autobahn_config_example.js to create 
the corresponding elastic_config.json autobahn_config.json and autobahn_config.js

Then build the docker image, docker build . -t corona_data_pusher  


Finally, launch the docker container, docker run -p 8080:8080 corona_data_pusher 

index.html contains the frontend code. Use a secured  host for the container and the frontend code.
