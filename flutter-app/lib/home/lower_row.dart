import 'package:covid19hospitaltracker/hospital_list/hospital_list_main.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class LowerRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HospitalListMain()),
            );
          },
          child: Container(
            width: MediaQuery.of(context).size.width * 0.885,
            height: 173.0,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(22.0),
              color: const Color(0xffeeeeee),
            ),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Container(
                    width: 50,
                    height: 50,
                    child: Icon(
                      FontAwesomeIcons.mapMarkedAlt,
                      size: 24,
                      color: Color(0xFFF9aa33),
                    ),
                    decoration: BoxDecoration(
                        border: Border.all(color: Color(0x5FF9aa33), width: 2),
                        shape: BoxShape.circle,
                        color: Color(0x3FF9aa33)),
                  ),
                  Text(
                    'Infectious Hospitals',
                    style: TextStyle(
                      fontFamily: 'Product Sans',
                      fontSize: 16,
                      color: const Color(0xff000000),
                      fontWeight: FontWeight.w700,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ]),
          ),
        )
      ],
    );
  }
}
