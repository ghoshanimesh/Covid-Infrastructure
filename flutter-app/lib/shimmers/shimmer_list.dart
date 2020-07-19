import 'package:covid19hospitaltracker/shimmers/hosp_loader_card.dart';
import 'package:flutter/material.dart';

class ListLoader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFffffff),
      height: MediaQuery.of(context).size.height * 0.82,
      child: ListView(
        children: <Widget>[for (int i = 0; i < 7; i++) HospLoaderCard()],
      ),
    );
  }
}
