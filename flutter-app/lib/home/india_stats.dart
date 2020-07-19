import 'package:covid19hospitaltracker/shimmers/shimmer_stats.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';

Future<Stats> fetchStats() async {
  final response = await http.get('https://api.covid19india.org/data.json');

  if (response.statusCode == 200) {
    return Stats.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to load Stats');
  }
}

class Stats {
  final int confirmed;
  final int active;
  final int deaths;
  final int recovered;

  Stats({this.confirmed, this.active, this.deaths, this.recovered});

  factory Stats.fromJson(Map<String, dynamic> json) {
    return Stats(
      confirmed: int.parse(json['statewise'][0]['confirmed']),
      active: int.parse(json['statewise'][0]['active']),
      deaths: int.parse(json['statewise'][0]['deaths']),
      recovered: int.parse(json['statewise'][0]['recovered']),
    );
  }
}

class IndiaStats extends StatefulWidget {
  @override
  _IndiaStatsState createState() => _IndiaStatsState();
}

class _IndiaStatsState extends State<IndiaStats> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchStats(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                Container(
                  width: 95.0,
                  height: 150.0,
                  padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: const Color(0xffffffff),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xffe1e1e1),
                        offset: Offset(0, 3),
                        blurRadius: 6,
                      ),
                    ],
                  ),
                  child: Column(children: <Widget>[
                    Container(
                      width: 50,
                      height: 50,
                      child: Icon(
                        FontAwesomeIcons.plus,
                        size: 24,
                        color: Color(0xFFF9aa33),
                      ),
                      decoration: BoxDecoration(
                          border:
                              Border.all(color: Color(0x5FF9aa33), width: 2),
                          shape: BoxShape.circle,
                          color: Color(0x3FF9aa33)),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    SizedBox(
                      width: 120.0,
                      child: Text(
                        "${NumberFormat.compact(locale: "en_IN").format(snapshot.data.confirmed)}",
                        style: TextStyle(
                          fontFamily: 'Product Sans',
                          fontSize: 18,
                          color: const Color(0xffF9aa33),
                          fontWeight: FontWeight.w700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    Text(
                      'Infected'.toUpperCase(),
                      style: TextStyle(
                        fontFamily: 'Product Sans',
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xffcccccc),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ]),
                ),
                Container(
                  width: 95.0,
                  height: 150.0,
                  padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: const Color(0xffffffff),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xffe1e1e1),
                        offset: Offset(0, 3),
                        blurRadius: 6,
                      ),
                    ],
                  ),
                  child: Column(children: <Widget>[
                    Container(
                      width: 50,
                      height: 50,
                      child: Icon(
                        FontAwesomeIcons.solidHeart,
                        size: 22,
                        color: Color(0xFF388E3C),
                      ),
                      decoration: BoxDecoration(
                          border:
                              Border.all(color: Color(0x5F388E3C), width: 2),
                          shape: BoxShape.circle,
                          color: Color(0x3F388E3C)),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    SizedBox(
                      width: 120.0,
                      child: Text(
                        "${NumberFormat.compact(locale: "en_IN").format(snapshot.data.recovered)}",
                        style: TextStyle(
                          fontFamily: 'Product Sans',
                          fontSize: 18,
                          color: const Color(0xff388E3C),
                          fontWeight: FontWeight.w700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    Text(
                      'Recovered'.toUpperCase(),
                      style: TextStyle(
                        fontFamily: 'Product Sans',
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xffcccccc),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ]),
                ),
                Container(
                  width: 95.0,
                  height: 150.0,
                  padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    color: const Color(0xffffffff),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xffe1e1e1),
                        offset: Offset(0, 3),
                        blurRadius: 6,
                      ),
                    ],
                  ),
                  child: Column(children: <Widget>[
                    Container(
                      width: 50,
                      height: 50,
                      child: Icon(
                        FontAwesomeIcons.times,
                        size: 24,
                        color: Color(0xFFE30425),
                      ),
                      decoration: BoxDecoration(
                          border:
                              Border.all(color: Color(0x5FE30425), width: 2),
                          shape: BoxShape.circle,
                          color: Color(0x3FE30425)),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    SizedBox(
                      width: 120.0,
                      child: Text(
                        "${NumberFormat.compact(locale: "en_IN").format(snapshot.data.deaths)}",
                        style: TextStyle(
                          fontFamily: 'Product Sans',
                          fontSize: 18,
                          color: const Color(0xffE30425),
                          fontWeight: FontWeight.w700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    Text(
                      'Deaths'.toUpperCase(),
                      style: TextStyle(
                        fontFamily: 'Product Sans',
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xffcccccc),
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ]),
                ),
              ]);
        } else if (snapshot.hasError) {
          return Text("Has Error in Fetching data due to ${snapshot.error}",
              style: TextStyle(color: Colors.white));
        }
        return StatsLoader();
      },
    );
  }
}
