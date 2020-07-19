import 'package:covid19hospitaltracker/symp_prev/symp_prev_main.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SympPrevBanner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 150.0,
        decoration: BoxDecoration(
            color: Color(0x2F32e0c4),
            borderRadius: BorderRadius.circular(10.0)),
        child: Row(
          children: <Widget>[
            Stack(
              children: <Widget>[
                Transform.translate(
                  offset: Offset(10.0, -19.0),
                  child: Transform.scale(
                    scale: 1.25,
                    child: Container(
                      width: 150.0,
                      height: 150.0,
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: const AssetImage('assets/mask-human.png'),
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(10.0, 0, 10, 0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(
                    width: 150,
                    child: Text(
                      'Symptoms & Preventions of Covid-19',
                      style: TextStyle(
                        fontFamily: 'Product Sans',
                        fontSize: 20,
                        color: const Color(0xff4aab9b),
                        fontWeight: FontWeight.w700,
                      ),
                      textAlign: TextAlign.left,
                    ),
                  ),
                  SizedBox(
                    height: 25,
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => SympPrevMain()),
                      );
                    },
                    child: SizedBox(
                      width: 150,
                      child: Row(
                        children: <Widget>[
                          Text(
                            'Read More',
                            style: TextStyle(
                              fontFamily: 'Product Sans',
                              fontSize: 16,
                              color: const Color(0xff4aab9b),
                              fontWeight: FontWeight.w700,
                            ),
                            textAlign: TextAlign.left,
                          ),
                          SizedBox(width: 1),
                          Container(
                            width: 20,
                            height: 20,
                            child: Icon(
                              FontAwesomeIcons.angleDoubleRight,
                              size: 16,
                              color: Color(0xff4aab9b),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ));
  }
}
