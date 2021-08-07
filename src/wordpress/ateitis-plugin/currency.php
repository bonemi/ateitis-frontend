<?php
/* ADD ARS as paypal supported. */
add_filter('woocommerce_paypal_supported_currencies', 'add_ars_paypal_valid_currency');
function add_ars_paypal_valid_currency($currencies)
{
    array_push($currencies, 'ARS');
    return $currencies;
}


add_action('graphql_register_types', function () {
    /* Register Currency Type */
    register_graphql_object_type('Currency', [
        'description' => __("Currenct exposed by WOOCS"),
        'fields' => [
                'name' => [
                    'type' => 'String',
                    'description' => __('Name of the currency.')
                ],
                'rate' => [
                    'type' => 'Float',
                    'description' => __('Rate of the currency.')
                ],
                'symbol' => [
                    'type' => 'String',
                    'description' => __('Symbol of the currency.')
                ],
                'pos' => [
                    'type' => 'String',
                    'description' => __('Poisiton of the currency.')
                ],
                'is_etalon' => [
                    'type' => 'Integer',
                    'description' => __('Is Etalon.')
                ],
                'description' => [
                    'type' => 'String',
                    'description' => __('Description of the currency.')
                ],
                'hide_cents' => [
                    'type' => 'Integer',
                    'description' => __('Hide Cents?')
                ],
                'custom' => [
                    'type' => 'String',
                    'description' => __('Custom Symbol')
                ],
        ]
    ]);

    /* Get current currency */
    register_graphql_field('RootQuery', 'woocsCurrentCurrency', [
        'type' => 'String',
        'resolve' => function ($root, $args, $context, $info) {
            $currency_plugin = new WOOMULTI_CURRENCY_F_Data();
            $currentCurrency  = $currency_plugin->get_current_currency();
            return $currentCurrency;
        }
    ]);
    /* Get default currencies */
    register_graphql_field('RootQuery', 'woocsDefaultCurrency', [
        'type' => 'String',
        'resolve' => function ($root, $args, $context, $info) {
            $currency_plugin = new WOOMULTI_CURRENCY_F_Data();
            $defaultCurrency = $currency_plugin->get_default_currency();
            return $defaultCurrency;
        }
    ]);
    
    /* Get All currencies */
    register_graphql_field('RootQuery', 'woocsCurrencies', [
        'type' => [ 'list_of' => 'Currency' ],
            'resolve' => function ($root, $args, $context, $info) {
                $currency_plugin = new WOOMULTI_CURRENCY_F_Data();
                $currencies = $currency_plugin->get_list_currencies();
                $currencyList = array();
                foreach ($currencies as $c => $val) {
                    $val['name'] = $c;
                    array_push($currencyList, $val);
                }
                return  $currencyList;
            }
        ]);
    
    /* Set a currency */
    register_graphql_mutation('setCurrency', [

        # inputFields expects an array of Fields to be used for inputtting values to the mutation
        'inputFields'         => [
            'newCurrency' => [
                'type' => 'String',
                'description' => 'The new currency to set',
            ],
        ],

        # outputFields expects an array of fields that can be asked for in response to the mutation
        # the resolve function is optional, but can be useful if the mutateAndPayload doesn't return an array
        # with the same key(s) as the outputFields
        'outputFields'        => [
            'newCurrency' => [
                'type' => 'String',
                'description' => 'A boolean if the currency could be changed.',
                'resolve' => function ($payload, $args, $context, $info) {
                    return isset($payload['currentCurrency']) ? $payload['currentCurrency'] : null;
                }
            ],
        ],

        # mutateAndGetPayload expects a function, and the function gets passed the $input, $context, and $info
        # the function should return enough info for the outputFields to resolve with
        'mutateAndGetPayload' => function ($input, $context, $info) {
            // Do any logic here to sanitize the input, check user capabilities, etc
            
            $currentCurrency = "ARS";
            if (class_exists('WOOMULTI_CURRENCY_F_Data')) {
                $currency_plugin = new WOOMULTI_CURRENCY_F_Data();
                $currency_plugin->set_current_currency($input['newCurrency'], true);
                $currentCurrency  = $currency_plugin->get_current_currency();
            }
        
        
            return [
                'currentCurrency' => $currentCurrency,
            ];
        }
    ]);
});



/* SOLUCION COOKIES */
// https://wordpress.org/support/topic/add-options-for-cookies/
    // /**
    //  * Set Cookie or Session
    //  *
    //  * @param        $name
    //  * @param        $value
    //  * @param int $time
    //  * @param string $path
    //  */
    // public function setcookie( $name, $value, $time = 86400, $path = '/' ) {

    // 	// 		setcookie( $name, $value, $time, $path );
    // 			$arr_cookie_options = array (
    // 					'expires' => $time,
    // 					'path' => $path,
    // 					'secure' => true,     // or false
    // 					'samesite' => 'None' // None || Lax  || Strict
    // 					);
    // 			setcookie($name, $value, $arr_cookie_options);
    // 			$_COOKIE[ $name ] = $value;
        
    // 		}
