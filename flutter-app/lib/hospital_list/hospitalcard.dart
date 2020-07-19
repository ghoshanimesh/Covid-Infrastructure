import 'package:covid19hospitaltracker/hospital_list/data_modal.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HospitalCard extends StatelessWidget {
  final String id;
  final String state;
  final String district;
  final String hospname;
  final int normalBeds;
  final int icuBeds;
  final int ventilatorBeds;

  HospitalCard(this.id, this.state, this.district, this.hospname,
      this.normalBeds, this.icuBeds, this.ventilatorBeds);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: InkWell(
        onTap: () {
          showModalBottomSheet(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20.0),
                    topRight: Radius.circular(20.0)),
              ),
              context: context,
              builder: (BuildContext context) {
                return DataModal(
                    this.id,
                    this.state,
                    this.district,
                    this.hospname,
                    this.normalBeds,
                    this.icuBeds,
                    this.ventilatorBeds);
              });
        },
        child: Card(
          color: Color(0xFF222831),
          elevation: 5,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12.5),
          ),
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: ListTile(
              leading: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(
                    FontAwesomeIcons.solidHospital,
                    size: 24,
                    color: Color(0xFF32e0c4),
                  ),
                ],
              ),
              title: Text(
                this.district.toUpperCase(),
                style: TextStyle(
                  fontFamily: 'Product Sans',
                  fontSize: 12,
                  color: const Color(0xbfaaaaaa),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.left,
              ),
              subtitle: Text(
                this.hospname,
                style: TextStyle(
                  fontFamily: 'Product Sans',
                  fontSize: 18,
                  color: const Color(0xffffffff),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.left,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
