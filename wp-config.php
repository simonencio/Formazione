<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'nuovo' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Um6*kz*&5Uj1E {TtEb9m@xL}TGn2psy!w!||JF1tl2@,`i^NL^sz[zZ1:v;cdCQ' );
define( 'SECURE_AUTH_KEY',  '<F%[%pnWu/FsQheI:+_)=h;UVyq~A2c_l)]}.9#hj+xHmOPP-r{/kIo|gy0YCu~c' );
define( 'LOGGED_IN_KEY',    'Ho:(`&PA(kd@+9g:R)Jl,cccVu3~LgoC#QyP1Ak+pup:z&FIZhJ8F`~ssI]nHYhE' );
define( 'NONCE_KEY',        'j1?3)6o=L~pEWQ6#M!:BUU2Z9}?4GuH3n[&4oBuOizpUTJ98EoktRc}{Q|+iIFj0' );
define( 'AUTH_SALT',        'Ngqp22A94;%Ym-_30GN{2O&i__OO4;S$j9lB/TFu2`XY*XhD*R7;WhPxtpZ;xt3p' );
define( 'SECURE_AUTH_SALT', ')/32<{4}e4t8!17=l]Rkx6wG48wS096pSw085O9>d/yZwB;@z&;bPeUXt }Jx@V+' );
define( 'LOGGED_IN_SALT',   ']~s_i#=),l5ZlR4@)]G[qgpg:Im$=%2EL5--D;ZPb0wnQ@Re^lMtzX`67`j!=YTK' );
define( 'NONCE_SALT',       'd-tt1AbiGV!dpfBX_EtlRpE*!r+eL)?uSvMLUAt9{:RmdzjGxZx2[XNc[c5j;w@A' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
