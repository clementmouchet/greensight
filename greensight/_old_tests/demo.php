<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html lang="en-EN">
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Script-Type" content="text/javascript">
        <meta http-equiv="Content-Style-Type" content="text/css">
        <title>
            Greensignt calculator prototype
        </title>
        <script src="http://code.jquery.com/jquery-1.6.4.min.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" src="http://dev.jquery.com/view/trunk/plugins/validate/jquery.validate.js">
</script>
        <script src="javascripts/jquery.selectboxes.min.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.selectboxes.pack.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/calculator.js" type="text/javascript" charset="utf-8">
</script>
        <script src="javascripts/jquery.OnEnter.js" type="text/javascript" charset="utf-8">
</script>
        <script type="text/javascript" charset="utf-8">
</script>
    </head>
    <body>
        <h1 id="titl">
            Computers carbon calculator Demo 4
        </h1>
        <div id="dcalclulator" class="shadow corners">
            <select name="sProfileCategory" id="sProfileCategory" class="sProfileCategory" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1">
                <option id="defaultdatacat" class="default" value="">
                    Select a data category
                </option>
            </select> <select name="productType" id="productType" class="productType" onchange="pickSelect($('#sProfileCategory').val(), $('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                <option id="defaultcat" class="default" value="">
                    Select a product type
                </option>
            </select> <select name="brand" id="brand" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a brand
                </option>
            </select> <select name="modelName" id="modelName" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model
                </option>
            </select> <select name="modelNumber" id="modelNumber" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a model Number
                </option>
            </select> <select name="category" id="category" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a category
                </option>
            </select> <select name="device" id="device" onchange="pickSelect($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a Device
                </option>
            </select> <select name="rating" id="rating" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a Rating
                </option>
            </select> <select name="onStandby" id="onStandby" onchange="setQuantity($('#sProfileCategory').val(),$('#productType').val(), $('#brand').val(), $('#modelName').val(), $('#modelNumber').val(), $('#category').val(),$('#device').val(), $('#rating').val())" size="1" style="display:none">
                <option class="default" value="">
                    Select a Rating
                </option>
            </select> <input type="text" name="quantity" value="1" id="quantity" style="display:none" onenter="getFooprint($('#sProfileCategory').val(),$('#productType').val(),$('#brand').val(),$('#modelName').val(), $('#modelNumber').val(),$('#category').val(),$('#device').val(), $('#rating').val(), $(this).val())"> <input type="button" name="reset" value="reset" id="reset" onclick="resetCalc()"><input type="button" name="submit" value="submit" id="submit" onclick="getFooprint($('#sProfileCategory').val(),$('#productType').val(),$('#brand').val(),$('#modelName').val(), $('#modelNumber').val(),$('#category').val(),$('#device').val(), $('#rating').val(), $('#quantity').val())">
            <div id="dresults">
                <span id="results"></span>
            </div>
        </div>
    </body>
</html>
