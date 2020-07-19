import 'package:covid19hospitaltracker/home/drawer.dart';
import 'package:covid19hospitaltracker/home/india_stats.dart';
import 'package:covid19hospitaltracker/home/lower_row.dart';
import 'package:covid19hospitaltracker/home/symp_prev_banner.dart';
import 'package:covid19hospitaltracker/home/upper_row.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: true,
      left: true,
      right: true,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Color(0xff000000),
          title: Text(
            "Covid-19 Infra Predictor",
            style: TextStyle(
              fontFamily: 'Product Sans',
              fontSize: 18,
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.center,
          ),
          centerTitle: true,
        ),
        drawer: Drawer(
          child: NavDrawer(),
        ),
        backgroundColor: Colors.white,
        body: Container(
          height: MediaQuery.of(context).size.height * 0.9,
          padding: EdgeInsets.fromLTRB(20, 20, 20, 0),
          child: ListView(children: <Widget>[
            UpperRow(),
            SizedBox(
              height: 15,
            ),
            IndiaStats(),
            SizedBox(
              height: 50,
            ),
            SympPrevBanner(),
            SizedBox(height: 15),
            LowerRow()
          ]),
        ),
      ),
    );
  }
}
