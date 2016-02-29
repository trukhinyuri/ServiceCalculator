QUnit.test( "Virtuozzo.Calculator._calculateTotalHours(days=30, hours=4)", function( assert ) {
    var price = new Price.VirtuozzoPrice();
    var calculator = new Virtuozzo.Calculator(price);
    var days = 30;
    var hours = 4;
    var expectedHours = 724;
    var actualHours = calculator._calculateTotalHours(days, hours);
    assert.ok( expectedHours == actualHours, "Passed! actualHours: " + actualHours );
});

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=0, vCPUCoresCount=1, vCPUFrequencyGhz=1, vtType=0, runningDays=30, runningHours=1)", 
    function( assert ) {
    var price = new Price.VirtuozzoPrice();
    var calculator = new Virtuozzo.Calculator(price);
    var region = 0; //spb
    var vCPUCoresCount = 1;
    var vCPUFrequencyGhz = 1;
    var vtType = 0;
    var runningDays = 30;
    var runningHours = 1;

    var expectedCPUCost = 196.11;
    var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
        vtType, runningDays, runningHours);
    assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
});

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=0, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=0, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 0;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 7.83;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=0, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=1, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 1;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 7.83;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=1, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=0, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 0;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 10.8;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=1, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=1, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 1;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 21.6;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=2, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=0, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //ams
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 0;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 10.8;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateCPURunningCost (" +
    "region=2, vCPUCoresCount=2, vCPUFrequencyGhz=0.3, vtType=1, runningDays=2, runningHours=0)",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //ams
        var vCPUCoresCount = 2;
        var vCPUFrequencyGhz = 0.3;
        var vtType = 1;
        var runningDays = 2;
        var runningHours = 0;

        var expectedCPUCost = 21.6;
        var actualCPUCost = calculator._calculateCPURunningCost(region, vCPUCoresCount, vCPUFrequencyGhz,
            vtType, runningDays, runningHours);
        assert.ok( expectedCPUCost == actualCPUCost, "Passed! actualCPUCost: " + actualCPUCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateRamRunningCost (" +
    "region=0, ramCount=2, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var ramCount = 2;
        var runningDays = 2;
        var runningHours = 1;

        var expectedRamCost = 40.87;
        var actualRamCost = calculator._calculateRamRunningCost(region, ramCount, runningDays, runningHours);
        assert.ok( expectedRamCost == actualRamCost, "Passed! actualRamCost: " + actualRamCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateRamRunningCost (" +
    "region=1, ramCount=2, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var ramCount = 2;
        var runningDays = 2;
        var runningHours = 1;

        var expectedRamCost = 53.9;
        var actualRamCost = calculator._calculateRamRunningCost(region, ramCount, runningDays, runningHours);
        assert.ok( expectedRamCost == actualRamCost, "Passed! actualRamCost: " + actualRamCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateRamRunningCost (" +
    "region=2, ramCount=2, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //ams
        var ramCount = 2;
        var runningDays = 2;
        var runningHours = 1;

        var expectedRamCost = 53.9;
        var actualRamCost = calculator._calculateRamRunningCost(region, ramCount, runningDays, runningHours);
        assert.ok( expectedRamCost == actualRamCost, "Passed! actualRamCost: " + actualRamCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateDiskCost (" +
    "region=0, diskCount=10, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var diskCount = 10;
        var runningDays = 2;
        var runningHours = 1;

        var expectedDiskCost = 8.33;
        var actualDiskCost = calculator._calculateDiskCost(region, diskCount, runningDays, runningHours);
        assert.ok( expectedDiskCost == actualDiskCost, "Passed! actualDiskCost: " + actualDiskCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateDiskCost (" +
    "region=1, diskCount=10, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var diskCount = 10;
        var runningDays = 2;
        var runningHours = 1;

        var expectedDiskCost = 6.13;
        var actualDiskCost = calculator._calculateDiskCost(region, diskCount, runningDays, runningHours);
        assert.ok( expectedDiskCost == actualDiskCost, "Passed! actualDiskCost: " + actualDiskCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateDiskCost (" +
    "region=1, diskCount=10, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //ams
        var diskCount = 10;
        var runningDays = 2;
        var runningHours = 1;

        var expectedDiskCost = 6.13;
        var actualDiskCost = calculator._calculateDiskCost(region, diskCount, runningDays, runningHours);
        assert.ok( expectedDiskCost == actualDiskCost, "Passed! actualDiskCost: " + actualDiskCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=0, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var ipv4Count = 1;
        var runningDays = 2;
        var runningHours = 1;

        var expectedIPv4Cost = 90;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=1, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var ipv4Count = 1;
        var runningDays = 2;
        var runningHours = 1;

        var expectedIPv4Cost = 90;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=2, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //msk
        var ipv4Count = 1;
        var runningDays = 2;
        var runningHours = 1;

        var expectedIPv4Cost = 90;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=0, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var ipv4Count = 1;
        var runningDays = 40;
        var runningHours = 1;

        var expectedIPv4Cost = 180;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=1, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var ipv4Count = 1;
        var runningDays = 40;
        var runningHours = 1;

        var expectedIPv4Cost = 180;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateIPv4Cost (" +
    "region=2, ipv4Count=1, runningDays=2, runningHours=1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //msk
        var ipv4Count = 1;
        var runningDays = 40;
        var runningHours = 1;

        var expectedIPv4Cost = 180;
        var actualIPv4Cost = calculator._calculateIPv4Cost(region, ipv4Count, runningDays, runningHours);
        assert.ok( expectedIPv4Cost == actualIPv4Cost, "Passed! actualIPv4Cost: " + actualIPv4Cost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=0, trafficOutCount=3072 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var trafficOutCount = 3072;

        var expectedTrafficOutCost = 0.00;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=0, trafficOutCount=3073 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var trafficOutCount = 3073;

        var expectedTrafficOutCost = 0.90;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=1, trafficOutCount=3072 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var trafficOutCount = 3072;

        var expectedTrafficOutCost = 0.00;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=1, trafficOutCount=3073 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var trafficOutCount = 3073;

        var expectedTrafficOutCost = 0.50;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=2, trafficOutCount=3072 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //msk
        var trafficOutCount = 3072;

        var expectedTrafficOutCost = 0.00;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateTrafficOutCost (" +
    "region=2, trafficOutCount=3073 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 2; //msk
        var trafficOutCount = 3073;

        var expectedTrafficOutCost = 0.50;
        var actualTrafficOutCost = calculator._calculateTrafficOutCost(region, trafficOutCount);
        assert.ok( expectedTrafficOutCost == actualTrafficOutCost, "Passed! actualTrafficOutCost: " + actualTrafficOutCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateOSCost (" +
    "region=0, osType=0, days=30, hours=0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var osType = 0;
        var days = 30;
        var hours = 0;

        var expectedOSCost = 0;
        var actualOSCost = calculator._calculateOSCost(region, osType, days, hours);
        assert.ok( expectedOSCost == actualOSCost, "Passed! actualOSCost: " + actualOSCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateOSCost (" +
    "region=0, osType=1, days=30, hours=0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 0; //spb
        var osType = 1;
        var days = 30;
        var hours = 0;

        var expectedOSCost = 500.4;
        var actualOSCost = calculator._calculateOSCost(region, osType, days, hours);
        assert.ok( expectedOSCost == actualOSCost, "Passed! actualOSCost: " + actualOSCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateOSCost (" +
    "region=1, osType=0, days=30, hours=0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var osType = 0;
        var days = 30;
        var hours = 0;

        var expectedOSCost = 0;
        var actualOSCost = calculator._calculateOSCost(region, osType, days, hours);
        assert.ok( expectedOSCost == actualOSCost, "Passed! actualOSCost: " + actualOSCost );
    });

QUnit.test( "Virtuozzo.Calculator._calculateOSCost (" +
    "region=1, osType=1, days=30, hours=0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var calculator = new Virtuozzo.Calculator(price);
        var region = 1; //msk
        var osType = 1;
        var days = 30;
        var hours = 0;

        var expectedOSCost = 244.8;
        var actualOSCost = calculator._calculateOSCost(region, osType, days, hours);
        assert.ok( expectedOSCost == actualOSCost, "Passed! actualOSCost: " + actualOSCost );
    });

QUnit.test( "Virtuozzo.Calculator.getCostOfRunningServer (" +
    "regionValue = 0, serverNameValue = \"server\", coresValue = 1, frequencyValue = 1, ramValue = 1, diskValue = 10, ipv4Value = 1, trafficOutValue = 100, vtTypeIndex = 0, osTypeIndex = 0, runningDaysValue = 30, runningHoursValue = 0, stoppedDaysValue = 0, stoppedHoursValue = 0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var virtuozzoCalculator = new Virtuozzo.Calculator(price);

        var regionValue = 0;
        var serverNameValue = "server";
        var coresValue = 1;
        var frequencyValue = 1;
        var ramValue = 1;
        var diskValue = 10;
        var ipv4Value = 1;
        var trafficOutValue = 100;
        var vtTypeIndex = 0;
        var osTypeIndex = 0;
        var runningDaysValue = 30;
        var runningHoursValue = 0;
        var stoppedDaysValue = 0;
        var stoppedHoursValue = 0;

        var virtuozzoServer = new Virtuozzo.Server(
            regionValue,
            serverNameValue,
            coresValue,
            frequencyValue,
            ramValue,
            diskValue,
            ipv4Value,
            trafficOutValue,
            vtTypeIndex,
            osTypeIndex,
            runningDaysValue,
            runningHoursValue,
            stoppedDaysValue,
            stoppedHoursValue);

        var expectedCostOfRunningServer = 708.48;

        virtuozzoCalculator.addServer(virtuozzoServer);
        var actualCostOfRunningServer = virtuozzoCalculator.getCostOfRunningServer(virtuozzoServer);
        assert.ok( expectedCostOfRunningServer == actualCostOfRunningServer, "Passed! actualCostOfRunningServer: " + actualCostOfRunningServer );
    });

QUnit.test( "Virtuozzo.Calculator.getCostOfStoppedServer (" +
    "regionValue = 0, serverNameValue = \"server\", coresValue = 1, frequencyValue = 1, ramValue = 1, diskValue = 10, ipv4Value = 1, trafficOutValue = 100, vtTypeIndex = 0, osTypeIndex = 0, runningDaysValue = 0, runningHoursValue = 0, stoppedDaysValue = 15, stoppedHoursValue = 0 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var virtuozzoCalculator = new Virtuozzo.Calculator(price);

        var regionValue = 0;
        var serverNameValue = "server";
        var coresValue = 1;
        var frequencyValue = 1;
        var ramValue = 1;
        var diskValue = 10;
        var ipv4Value = 1;
        var trafficOutValue = 100;
        var vtTypeIndex = 0;
        var osTypeIndex = 0;
        var runningDaysValue = 0;
        var runningHoursValue = 0;
        var stoppedDaysValue = 15;
        var stoppedHoursValue = 0;

        var virtuozzoServer = new Virtuozzo.Server(
            regionValue,
            serverNameValue,
            coresValue,
            frequencyValue,
            ramValue,
            diskValue,
            ipv4Value,
            trafficOutValue,
            vtTypeIndex,
            osTypeIndex,
            runningDaysValue,
            runningHoursValue,
            stoppedDaysValue,
            stoppedHoursValue);

        var expectedCostOfStoppedServer = 151.20;

        virtuozzoCalculator.addServer(virtuozzoServer);
        var actualCostOfStoppedServer = virtuozzoCalculator.getCostOfStoppedServer(virtuozzoServer);
        assert.ok( expectedCostOfStoppedServer == actualCostOfStoppedServer, "Passed! actualCostOfStoppedServer: " + actualCostOfStoppedServer );
    });

QUnit.test( "Virtuozzo.Calculator.getCostOfServer (" +
    "regionValue = 0, serverNameValue = \"server\", coresValue = 1, frequencyValue = 1, ramValue = 1, diskValue = 10, ipv4Value = 1, trafficOutValue = 100, vtTypeIndex = 0, osTypeIndex = 0, runningDaysValue = 0, runningHoursValue = 1, stoppedDaysValue = 0, stoppedHoursValue = 1 )",
    function( assert ) {
        var price = new Price.VirtuozzoPrice();
        var virtuozzoCalculator = new Virtuozzo.Calculator(price);

        var regionValue = 0;
        var serverNameValue = "server";
        var coresValue = 1;
        var frequencyValue = 1;
        var ramValue = 1;
        var diskValue = 10;
        var ipv4Value = 1;
        var trafficOutValue = 100;
        var vtTypeIndex = 0;
        var osTypeIndex = 0;
        var runningDaysValue = 0;
        var runningHoursValue = 1;
        var stoppedDaysValue = 0;
        var stoppedHoursValue = 1;

        var virtuozzoServer = new Virtuozzo.Server(
            regionValue,
            serverNameValue,
            coresValue,
            frequencyValue,
            ramValue,
            diskValue,
            ipv4Value,
            trafficOutValue,
            vtTypeIndex,
            osTypeIndex,
            runningDaysValue,
            runningHoursValue,
            stoppedDaysValue,
            stoppedHoursValue);

        var expectedCostOfServer = 91.03;

        virtuozzoCalculator.addServer(virtuozzoServer);
        var actualCostOfServer = virtuozzoCalculator.getCostOfServer(virtuozzoServer);
        assert.ok( expectedCostOfServer == actualCostOfServer, "Passed! actualCostOfServer: " + actualCostOfServer );
    });


