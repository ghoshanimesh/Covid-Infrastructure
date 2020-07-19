import 'package:covid19hospitaltracker/hospital_list/valuewidget.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class PredStatsCard extends StatelessWidget {
  int predHospitalized;
  int predRecovered;
  int predDeath;

  PredStatsCard(this.predHospitalized, this.predRecovered, this.predDeath);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Predicted Values',
            style: TextStyle(
              fontFamily: 'Product Sans',
              fontSize: 20,
              color: const Color.fromRGBO(0, 0, 0, 1),
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.left,
          ),
          SizedBox(
            height: 15,
          ),
          Table(
            defaultColumnWidth: FixedColumnWidth(100.0),
            columnWidths: {
              1: FractionColumnWidth(0.03),
              3: FractionColumnWidth(0.03)
            },
            children: [
              TableRow(children: [
                ValueWidget(
                    Color(0xFFF9aa33),
                    Color(0x3FF9aa33),
                    Color(0x5FF9aa33),
                    FontAwesomeIcons.plus,
                    "Hospitalized",
                    this.predHospitalized),
                SizedBox(width: 5),
                ValueWidget(
                    Color(0xFF388E3C),
                    Color(0x3F388E3C),
                    Color(0x5F388E3C),
                    FontAwesomeIcons.solidHeart,
                    "Recovered",
                    this.predRecovered),
                SizedBox(width: 5),
                ValueWidget(
                    Color(0xFFE30425),
                    Color(0x3FE30425),
                    Color(0x5FE30425),
                    FontAwesomeIcons.times,
                    "Deaths",
                    this.predDeath),
              ])
            ],
          ),
        ],
      ),
    );
  }
}
