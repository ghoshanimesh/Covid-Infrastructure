import 'package:covid19hospitaltracker/hospital_list/hospitalcard.dart';
import 'package:covid19hospitaltracker/shimmers/shimmer_list.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

Future<List<Hospitals>> getAllHospitals() async {
  final response = await http
      .get("https://api-infra-covid-tracker.herokuapp.com/getAllHospitals");
  if (response.statusCode == 200) {
    return allPostsFromJson(response.body);
  } else {
    throw Exception('Failed to load Stats');
  }
}

List<Hospitals> allPostsFromJson(String str) {
  final jsonData = json.decode(str);
  return new List<Hospitals>.from(jsonData.map((x) => Hospitals.fromJson(x)));
}

class Hospitals {
  final String id;
  final String state;
  final String district;
  final String hospname;
  final int normalBeds;
  final int icuBeds;
  final int ventilatorBeds;

  Hospitals(
      {this.id,
      this.state,
      this.district,
      this.hospname,
      this.normalBeds,
      this.icuBeds,
      this.ventilatorBeds});

  factory Hospitals.fromJson(Map<String, dynamic> json) => new Hospitals(
      id: json["_id"],
      state: json["state"],
      district: json["district"],
      hospname: json["hospital_name"],
      normalBeds: json["no_of_normal_beds"],
      icuBeds: json["no_of_icu_beds"],
      ventilatorBeds: json["no_of_ventilators"]);
}

class HospitalListMain extends StatefulWidget {
  @override
  _HospitalListMainState createState() => _HospitalListMainState();
}

class _HospitalListMainState extends State<HospitalListMain> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: true,
      left: true,
      right: true,
      child: Scaffold(
        body: Container(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 0),
          child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    GestureDetector(
                      onTap: () {
                        Navigator.pop(context);
                      },
                      child: Container(
                        padding: EdgeInsets.all(5),
                        width: 30.0,
                        height: 30.0,
                        child: Icon(
                          FontAwesomeIcons.arrowLeft,
                          size: 22,
                          color: Color(0xFF000000),
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Text(
                      'Covid-19 Tracker',
                      style: TextStyle(
                        fontFamily: 'Product Sans',
                        fontSize: 20,
                        color: const Color.fromRGBO(0, 0, 0, 1),
                        fontWeight: FontWeight.w700,
                      ),
                      textAlign: TextAlign.left,
                    ),
                  ],
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  'Hospitals',
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
                Container(
                  height: MediaQuery.of(context).size.height * 0.82,
                  child: FutureBuilder(
                    future: getAllHospitals(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                          itemCount: snapshot.data.length,
                          itemBuilder: (context, index) {
                            Hospitals hospital = snapshot.data[index];
                            return Column(
                              children: <Widget>[
                                HospitalCard(
                                    hospital.id,
                                    hospital.state,
                                    hospital.district,
                                    hospital.hospname,
                                    hospital.normalBeds,
                                    hospital.icuBeds,
                                    hospital.ventilatorBeds)
                              ],
                            );
                          },
                        );
                      } else if (snapshot.hasError) {
                        return Text(
                            "Has Error in Fetching data due to ${snapshot.error}",
                            style: TextStyle(color: Colors.black));
                      }
                      return ListLoader();
                    },
                  ),
                ),
              ]),
        ),
      ),
    );
  }
}
