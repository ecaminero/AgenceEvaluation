(function () {
    "use strict";

    angular
        .module("app.core")
        .constant("BASE_API_URI", "http://localhost:5000")
        .constant("moment", moment)
        .constant("_", window._)
        .constant("pieChart", {
            caption: "Split of Visitors by Age Group",
            subCaption: "Last year",
            paletteColors: "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
            bgColor: "#ffffff",
            showBorder: "0",
            use3DLighting: "0",
            showShadow: "0",
            enableSmartLabels: "0",
            startingAngle: "0",
            showPercentValues: "1",
            showPercentInTooltip: "0",
            decimals: "1",
            captionFontSize: "14",
            subcaptionFontSize: "14",
            subcaptionFontBold: "0",
            toolTipColor: "#ffffff",
            toolTipBorderThickness: "0",
            toolTipBgColor: "#000000",
            toolTipBgAlpha: "80",
            toolTipBorderRadius: "2",
            toolTipPadding: "5",
            showHoverEffect: "1",
            showLegend: "1",
            legendBgColor: "#ffffff",
            legendBorderAlpha: '0',
            legendShadow: '0',
            legendItemFontSize: '10',
            plottooltext: "Usuario : $label Ganancia : $datavalue",
            legendItemFontColor: '#666666'
            
        })
        .constant("charByMoths", {
            "caption": "Comparison of Quarterly Revenue",
            "xAxisname": "Quarter",
            "yAxisName": "Revenues (In USD)",
            "numberPrefix": "$",
            "plotFillAlpha": "80",
            "paletteColors": "#0075c2,#1aaf5d",
            "baseFontColor": "#333333",
            "baseFont": "Helvetica Neue,Arial",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "showBorder": "0",
            "bgColor": "#ffffff",
            "showShadow": "0",
            "canvasBgColor": "#ffffff",
            "canvasBorderAlpha": "0",
            "divlineAlpha": "100",
            "divlineColor": "#999999",
            "divlineThickness": "1",
            "divLineIsDashed": "1",
            "divLineDashLen": "1",
            "divLineGapLen": "1",
            "usePlotGradientColor": "0",
            "showplotborder": "0",
            "valueFontColor": "#ffffff",
            "placeValuesInside": "1",
            "showHoverEffect": "1",
            "rotateValues": "1",
            "showXAxisLine": "1",
            "xAxisLineThickness": "1",
            "xAxisLineColor": "#999999",
            "showAlternateHGridColor": "0",
            "legendBgAlpha": "0",
            "legendBorderAlpha": "0",
            "legendShadow": "0",
            "legendItemFontSize": "10",
            "legendItemFontColor": "#666666"
        });
})();

