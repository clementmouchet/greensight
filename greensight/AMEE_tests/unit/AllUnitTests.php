<?php

/*
 * This file provides the Services_AMEE_AllUnitTests class. Please see the class
 * documentation for full details.
 *
 * PHP Version 5
 *
 * @category  Web Services
 * @package   Services_AMEE
 * @version   $Id$
 * @author    Andrew Hill <help@amee.com>
 * @copyright 2010-2011 AMEE UK Limited
 * @license   http://www.opensource.org/licenses/mit-license.html MIT License
 * @link      http://pear.php.net/package/Services_AMEE
 */

require_once 'testConfig.php';
require_once 'AMEE/ExceptionTest.php';
require_once '/AMEE/BaseObjectTest.php';
require_once '/AMEE/BaseItemObjectTest.php';
require_once '/AMEE/APITest.php';
require_once '/AMEE/ProfileTest.php';
require_once '/AMEE/ProfileItemTest.php';
require_once '/AMEE/DataItemTest.php';

/**
 * The Services_AMEE_AllUnitTests class provides a convenient way of running all
 * of the PHPUnit unit tests for the Services_AMEE package.
 *
 * @category  Web Services
 * @package   Services_AMEE
 * @version   $Id$
 * @author    Andrew Hill <help@amee.com>
 * @copyright 2010-2011 AMEE UK Limited
 * @license   http://www.opensource.org/licenses/mit-license.html MIT License
 * @link      http://pear.php.net/package/Services_AMEE
 */
class Services_AMEE_AllUnitTests extends PHPUnit_Framework_TestSuite
{

    public static function suite()
    {
        // Create the test suite
        $oUnitTestSuite = new Services_AMEE_AllUnitTests();

        // Add all of the individual unit test classes
        $oUnitTestSuite->addTestSuite('Services_AMEE_Exception_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_BaseObject_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_BaseItemObject_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_API_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_Profile_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_ProfileItem_UnitTest');
        $oUnitTestSuite->addTestSuite('Services_AMEE_DataItem_UnitTest');

        // Return the test suite
        return $oUnitTestSuite;
    }

}

?>
