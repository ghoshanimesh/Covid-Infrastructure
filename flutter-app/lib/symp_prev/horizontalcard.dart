import 'package:flutter/material.dart';

class HorizontalCard extends StatelessWidget {
  final String imgPath;
  final String title;
  HorizontalCard(this.imgPath, this.title);
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Container(
          width: MediaQuery.of(context).size.width * 0.33,
          padding: EdgeInsets.all(10),
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
          child: Column(
            children: <Widget>[
              Container(
                width: 95,
                height: 95,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(this.imgPath),
                    fit: BoxFit.fill,
                  ),
                ),
              ),
              SizedBox(height: 7.5),
              Text(
                this.title,
                style: TextStyle(
                  fontFamily: 'Product Sans',
                  fontSize: 16,
                  color: const Color.fromRGBO(0, 0, 0, 1),
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.left,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
