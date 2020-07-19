import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class UpperRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        Container(
          padding: EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'Covid-19 Latest Update',
                style: TextStyle(
                  fontFamily: 'Product Sans',
                  fontSize: 20,
                  color: const Color.fromRGBO(0, 0, 0, 1),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.left,
              ),
              SizedBox(height: 5,),
              Text(
                'Last Updated ${DateTime.now().day} ${DateFormat('MMM').format(DateTime.now())}, ${DateTime.now().year}',
                style: TextStyle(
                  fontFamily: 'Product Sans',
                  fontSize: 14,
                  color: const Color(0xffaaaaaa),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.left,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
