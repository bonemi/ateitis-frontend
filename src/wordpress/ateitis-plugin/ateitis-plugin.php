<?php
/*
Plugin Name: Ateitis Plugin
Description: Site specific code changes for ateitiscorp.com
Version: 0.2
*/
/* Start Adding Functions Below this Line */


define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'token123');
define('GRAPHQL_DEBUG', 1 | 2);

include(plugin_dir_path(__FILE__) . 'contact-form.php');
include(plugin_dir_path(__FILE__) . 'custom-posts.php');
include(plugin_dir_path(__FILE__) . 'currency.php');


  
/* Stop Adding Functions Below this Line */
