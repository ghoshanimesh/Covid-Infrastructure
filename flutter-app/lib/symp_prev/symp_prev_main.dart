import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'horizontalcard.dart';

class SympPrevMain extends StatelessWidget {
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
                  //BackButton
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
              //The Rest List
              Container(
                height: MediaQuery.of(context).size.height * 0.87,
                padding: EdgeInsets.fromLTRB(15,15,15,0),
                child: ListView(
                  children: <Widget>[
                    Text(
                      'Symptoms',
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
                    Wrap(
                      children: <Widget>[
                        HorizontalCard("assets/cough.png", "Dry Cough"),
                        HorizontalCard("assets/fever.png", "Fever"),
                        HorizontalCard("assets/sneeze.png", "Sneezing"),
                      ],
                    ),
                    Text(
                      'Preventions',
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
                    Wrap(
                      children: <Widget>[
                        HorizontalCard("assets/mask.png", "Wear a Mask"),
                        HorizontalCard("assets/wash-hands.png", "Wash your Hands"),
                        HorizontalCard("assets/avoid-contact.png", "Avoid Contact with People"),
                        HorizontalCard("assets/social-distancing.png", "Maintain Social Distancing"),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
