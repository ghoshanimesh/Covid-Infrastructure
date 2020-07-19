import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class HospLoaderCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(5),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.5),
          color: const Color(0xffeeeeee),
        ),
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: ListTile(
              leading: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Shimmer.fromColors(
                    baseColor: Color(0xFFcccccc),
                    highlightColor: Color(0xFFdddddd),
                    child: Container(
                      height: 28,
                      width: 28,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        color: Color(0xFFcccccc),
                      ),
                    ),
                  )
                ],
              ),
              title: Shimmer.fromColors(
                baseColor: Color(0xFFcccccc),
                highlightColor: Color(0xFFeeeeee),
                child: Container(
                  height: 12,
                  width: 48,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(5),
                    color: Color(0xFFcccccc),
                  ),
                ),
              ),
              subtitle: Shimmer.fromColors(
                baseColor: Color(0xFFcccccc),
                highlightColor: Color(0xFFeeeeee),
                child: Container(
                  height: 18,
                  width: 10,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(5),
                    color: Color(0xFFcccccc),
                  ),
                ),
              )),
        ),
      ),
    );
  }
}
