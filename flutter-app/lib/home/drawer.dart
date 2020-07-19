import 'package:covid19hospitaltracker/home/home.dart';
import 'package:covid19hospitaltracker/hospital_list/hospital_list_main.dart';
import 'package:covid19hospitaltracker/symp_prev/symp_prev_main.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class NavDrawer extends StatelessWidget {
  Widget _createHeader() {
    return Container(
        height: 75,
        padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
        decoration: BoxDecoration(
            image: DecorationImage(
              fit: BoxFit.contain,
              image: AssetImage('assets/logo.png'),
            ),
            color: Color(0xff000000)));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView(
        padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(0, 55, 0, 30),
            color: Color(0xff000000),
            child: Column(
              children: <Widget>[
                _createHeader(),
                SizedBox(
                  height: 20,
                ),
                Text(
                  "Covid-19 Infrastructure Predictor",
                  style: TextStyle(
                    fontFamily: 'Product Sans',
                    fontSize: 18,
                    color: Color(0xFFffffff),
                    fontWeight: FontWeight.w700,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
          ListTile(
            leading: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  FontAwesomeIcons.home,
                  size: 30,
                  color: Color(0xFF32e0c4),
                ),
              ],
            ),
            title: Text(
              "Home",
              style: TextStyle(
                fontFamily: 'Product Sans',
                fontSize: 18,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
            onTap: () {
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  FontAwesomeIcons.headSideMask,
                  size: 30,
                  color: Color(0xFF32e0c4),
                ),
              ],
            ),
            title: Text(
              "Symptoms & Preventions",
              style: TextStyle(
                fontFamily: 'Product Sans',
                fontSize: 18,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SympPrevMain()),
              );
            },
          ),
          ListTile(
            leading: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Icon(
                  FontAwesomeIcons.mapMarked,
                  size: 30,
                  color: Color(0xFF32e0c4),
                ),
              ],
            ),
            title: Text(
              "Hospitals",
              style: TextStyle(
                fontFamily: 'Product Sans',
                fontSize: 18,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => HospitalListMain()),
              );
            },
          ),
          Divider(),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text(
              "App v1.0.0",
              style: TextStyle(
                fontFamily: 'Product Sans',
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.left,
            ),
          ),
        ],
      ),
    );
  }
}
