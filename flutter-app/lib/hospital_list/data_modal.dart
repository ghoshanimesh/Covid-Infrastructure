import 'package:covid19hospitaltracker/hospital_list/bed_card.dart';
import 'package:covid19hospitaltracker/hospital_list/stats_card_pred.dart';
import 'package:covid19hospitaltracker/shimmers/shimmer_stats.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

extension CapExtension on String {
  String get inCaps =>
      '${this[0].toUpperCase()}${this.substring(1).toLowerCase()}';
  String get allInCaps => this.toUpperCase();
}

Future<Object> fetchPredStats(String id) async {
  try {
    final response = await http.get(
        'https://infra-prediction-model.herokuapp.com/getPredictionValue/' +
            id);

    if (response.statusCode == 200) {
      // print(json.decode(response.body));
      return json.decode(response.body);
    } else {
      throw Exception('Response code 503');
    }
  } on TimeoutException catch (e) {
    throw TimeoutException("Timeout " + e.toString());
  } on Exception catch (e) {
    throw Exception("Exception " + e.toString());
  }
}

Future<Object> fetchBedAvailability(String id) async {
  final response = await http
      .get('https://api-infra-covid-tracker.herokuapp.com/getCountOfBed/' + id);

  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load Stats');
  }
}

class DataModal extends StatefulWidget {
  String id;
  final String state;
  final String district;
  final String hospname;
  final int normalBeds;
  final int icuBeds;
  final int ventilatorBeds;

  DataModal(this.id, this.state, this.district, this.hospname, this.normalBeds,
      this.icuBeds, this.ventilatorBeds);

  @override
  _DataModalState createState() => _DataModalState();
}

class _DataModalState extends State<DataModal> {
  Future<Object> _prediction;
  Future<Object> _beds;
  @override
  void initState() {
    _prediction = fetchPredStats(widget.id);
    _beds = fetchBedAvailability(widget.id);
    super.initState();
  }

  Widget build(BuildContext context) {
    return Container(
      height: 300,
      padding: EdgeInsets.all(10),
      child: Column(children: <Widget>[
        ListTile(
          title: Text(
            this.widget.hospname,
            style: TextStyle(
              fontFamily: 'Product Sans',
              fontSize: 18,
              color: const Color(0xff000000),
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.left,
          ),
          subtitle: Padding(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 0),
            child: Text(
              '${this.widget.district.inCaps}, ${this.widget.state.inCaps}',
              style: TextStyle(
                fontFamily: 'Product Sans',
                fontSize: 14,
                color: const Color(0xaf000000),
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
          ),
        ),
        SizedBox(height: 10),
        Expanded(
          child: PageView(
            scrollDirection: Axis.vertical,
            children: <Widget>[
              FutureBuilder(
                  future: _prediction,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return PredStatsCard(snapshot.data["Hospitalized"],
                          snapshot.data["Recovered"], snapshot.data["Death"]);
                    } else if (snapshot.hasError) {
                      return Text(
                          "Has Error in Fetching data due to ${snapshot.error}",
                          style: TextStyle(color: Colors.black));
                    }
                    return StatsLoader();
                  }),
              FutureBuilder(
                  future: _beds,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return BedCard(
                          snapshot.data["NORMAL_BED"],
                          snapshot.data["ICU_BED"],
                          snapshot.data["VENTILATOR_BED"]);
                    } else if (snapshot.hasError) {
                      return Text(
                          "Has Error in Fetching data due to ${snapshot.error}",
                          style: TextStyle(color: Colors.black));
                    }
                    return StatsLoader();
                  }),
            ],
          ),
        ),
      ]),
    );
  }
}
