<?php

/**
 * Print Send Message
 *
 * @param integer $code
 * @return string
 */
function responseText(int $code=0): string {

    if($code === 0) return 'Error - Žádná Data';
    if($code === 1) return 'Error - Nesprávná Captcha';
    if($code === 2) return 'Děkujeme Za Zprávu';
}

if(isset($_POST) && !empty($_POST) && isset($_POST['grecaptcha']) && !empty($_POST['grecaptcha'])) {

    /**
     * Check Recaptcha
     * 
     */

    // User Response
    $recaptcha = $_POST['grecaptcha'];

    // Secret Key
    $secret_key = '6LdwMnYiAAAAAEYjQLBSanE83BrK9y3tcwGAXajP';
  
    // Recaptcha API
    $url = 'https://www.google.com/recaptcha/api/siteverify?secret='
          . $secret_key . '&response=' . $recaptcha;

    // Making request to verify captcha
    $response = file_get_contents($url);      

    // Get Response
    $response = json_decode($response);

    // Checking, if response is true or not
    if ($response->success == true) {

        /**
         * Include WordPress
         */

        require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');

        // Form Data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $tel = $_POST['tel'];
        $company = $_POST['company'];
        $message = $_POST['message'];

        /**
         * Send Emails
         */

        $template = '
            <div>Jméno ' . $name . '</div>
            <div>Email ' . $email . '</div>
            <div>Tel ' . $tel . '</div>
            <div>Společnost ' . $company . '</div>
            <div>Zpráva ' . $message . '</div>
        ';
        $headers = array('Content-Type: text/html; charset=UTF-8');
        
        // Admin
        wp_mail( 'contact@chymcakmilan.com', 'Nový Kontakt', $template, $headers );

        // Customer
        wp_mail( $email, 'Děkujeme', $template, $headers );

        // Success Message
        echo responseText(2);

        
    } else {
        /**
         * Error Recaptcha
         */
        echo responseText(1);
    }

} else {

    /**
     * Error
     */
    echo responseText(0);
}