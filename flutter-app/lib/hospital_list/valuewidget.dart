import 'package:flutter/material.dart';

class ValueWidget extends StatelessWidget {
  IconData widgeticon;
  Color solid;
  Color backface;
  Color border;
  String title;
  int value;

  ValueWidget(this.solid,this.backface, this.border, this.widgeticon, this.title, this.value);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 130.0,
      padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
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
            this.widgeticon,
            size: 24,
            color: solid,
          ),
          decoration: BoxDecoration(
              border: Border.all(color: border, width: 2),
              shape: BoxShape.circle,
              color: backface),
        ),
        SizedBox(
          height: 15,
        ),
        SizedBox(
          width: 120.0,
          child: Text(
            "${this.value}",
            style: TextStyle(
              fontFamily: 'Product Sans',
              fontSize: 18,
              color: solid,
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        SizedBox(
          height: 5,
        ),
        Text(
          title.toUpperCase(),
          style: TextStyle(
            fontFamily: 'Product Sans',
            fontSize: 10,
            fontWeight: FontWeight.bold,
            color: const Color(0xffcccccc),
          ),
          textAlign: TextAlign.center,
        ),
      ]),
    );
  }
}
