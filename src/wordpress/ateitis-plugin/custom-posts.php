<?php
/**
 * Custom posts here
 */
 
 /**
 * Custom posts for nosotros modals
 */
 add_action('init', function () {
     register_post_type('nosotrosListado', [
      'show_ui' => true,
      'public' => true,
      'labels'  => [
          'menu_name' => __('Nosotros Listado', 'nosotros-listado'),//@see https://developer.wordpress.org/themes/functionality/internationalization/
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'nosotrosItem',
      'graphql_plural_name' => 'nosotrosLista',
   ]);
 });

 /**
 * Custom posts for servicios modals
 */
 add_action('init', function () {
     register_post_type('serviciosListados', [
      'show_ui' => true,
      'public' => true,
      'labels'  => [
          'menu_name' => __('Servicios Listados', 'servicios-listados'),//@see https://developer.wordpress.org/themes/functionality/internationalization/
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'serviciosItem',
      'graphql_plural_name' => 'serviciosListados',
   ]);
 });

 /**
 * Custom posts for clientes satisfechos modals
 */
 add_action('init', function () {
     register_post_type('clientesSatisfechos', [
      'show_ui' => true,
      'public' => true,
      'labels'  => [
          'menu_name' => __('Clientes Satisfechos', 'clientes-satisfechos'),//@see https://developer.wordpress.org/themes/functionality/internationalization/
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'clientSatisfecho',
      'graphql_plural_name' => 'clientesSatisfechos',
   ]);
 });

 /**
 * Custom posts for redes sociales icons
 */
 add_action('init', function () {
     register_post_type('redesSociales', [
      'show_ui' => true,
      'public' => true,
      'labels'  => [
          'menu_name' => __('Redes Sociales', 'redes-sociales'),//@see https://developer.wordpress.org/themes/functionality/internationalization/
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'redSocial',
      'graphql_plural_name' => 'redesSociales',
   ]);
 });

 /**
 * Custom posts for contact forms
 */
 add_action('init', function () {
     register_post_type('formularioContacto', [
      'show_ui' => true,
      'public' => true,
      'labels'  => [
          'menu_name' => __('Formulario Contacto', 'formulario-contacto'),//@see https://developer.wordpress.org/themes/functionality/internationalization/
      ],
      'show_in_graphql' => true,
      'hierarchical' => true,
      'graphql_single_name' => 'formularioContacto',
      'graphql_plural_name' => 'formulariosContacto',
   ]);
 });
