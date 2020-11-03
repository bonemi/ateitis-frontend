<?php

 /**
 * Custom code to mutation data with graphql
 */

add_action('graphql_register_types', function () {
    register_graphql_mutation('createContactMessage', [
        'inputFields' => [
            'empresa' => [
                'type' => 'String',
                'description' => 'Nombre de la empresa',
            ],
            'nombre' => [
                'type' => 'String',
                'description' => 'Nombre del usuario',
            ],
            'email' => [
                'type' => 'String',
                'description' => 'e-mail del usuario',
            ],
            'whatsapp' => [
                'type' => 'String',
                'description' => 'whatsapp del usuario',
            ],
            'mensaje' => [
                'type' => 'String',
                'description' => 'Mensaje del usuario',
            ],
        ],
        'outputFields' => [
            'success' => [
                'type' => 'Boolean',
                'description' => 'Whether or not data was stored successfully',
                'resolve' => function ($payload, $args, $context, $info) {
                    return isset($payload['success']) ? $payload['success'] : null;
                }
            ],
            'data' => [
                'type' => 'String',
                'description' => 'Payload of submitted fields',
                'resolve' => function ($payload, $args, $context, $info) {
                    return isset($payload['data']) ? $payload['data'] : null;
                }
            ]
        ],
        'mutateAndGetPayload' => function ($input, $context, $info) {
            if (!class_exists('ACF')) {
                return [
                'success' => false,
                'data' => 'ACF is not installed'
            ];
            }

            $sanitized_data = [];
            $errors = [];
            $acceptable_fields = [
                'empresa' => 'field_5f754a896dcad',
                'nombre' => 'field_5f754aef6dcae',
                'email' => 'field_5f754afc6dcaf',
                'whatsapp' => 'field_5f754b186dcb0',
                'mensaje' => 'field_5f754b206dcb1',
            ];
            
            // wp mail to notify via mail
            $to = 'contacto@ateitiscorp.com';
            $subject = 'Nueva consulta en el sitio Ateitis de ' . $input["empresa"];
            $body = 'De: '. '<b>'.$input["empresa"].'</b>'. '<br><br>'. 'Nombre: '. '<b>'.$input["nombre"].'</b>'. '<br><br>'. 'E-mail: '.'<b>'.$input["email"].'</b>'. '<br><br>'. 'Whatsapp: '. '<b>'.$input["whatsapp"].'</b>'. '<br><br>'. '<b>'. 'Mensaje: '. '</b><br>'.    $input["mensaje"];
            $headers = array('Content-Type: text/html; charset=UTF-8');
            
            wp_mail($to, $subject, $body, $headers);
            //end of wp mail to notify via mail code


            foreach ($acceptable_fields as $field_key => $acf_key) {
                if (!empty($input[$field_key])) {
                    $sanitized_data[$field_key] = sanitize_text_field($input[$field_key]);
                } else {
                    $errors[] = $field_key . ' was not filled out.';
                }
            }

            if (!empty($errors)) {
                return [
                'success' => false,
                'data' => $errors
            ];
            }

            $form_submission = wp_insert_post([
                'post_type' => 'formularioContacto',
                'post_title' => $sanitized_data['empresa'] . ' ' . $sanitized_data['nombre'],
            ], true);
            

            if (is_wp_error($form_submission)) {
                return [
                'success' => false,
                'data' => $form_submission->get_error_message()
            ];
            }

            foreach ($acceptable_fields as $field_key => $acf_key) {
                update_field($acf_key, $sanitized_data[$field_key], $form_submission);
            }

            return [
                'success' => true,
                'data' => json_encode($sanitized_data)
            ];
        }
    ]);
});
