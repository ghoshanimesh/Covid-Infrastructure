import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:shimmer/shimmer.dart';

class StatsLoader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Container(
              width: 95.0,
              height: 150.0,
              padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
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
                Shimmer.fromColors(
                  baseColor: Color(0xFFeeeeee),
                  highlightColor: Color(0xFFffffff),
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle, color: Color(0xFFeeeeee)),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                SizedBox(
                    width: 120.0,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                      child: Shimmer.fromColors(
                          child: Container(
                            height: 18,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2.5),
                              color: Color(0xFFeeeeee),
                            ),
                          ),
                          baseColor: Color(0xFFcccccc),
                          highlightColor: Color(0xFFffffff)),
                    )),
                SizedBox(
                  height: 5,
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                  child: Shimmer.fromColors(
                      child: Container(
                        height: 10,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(2.5),
                          color: Color(0xFFeeeeee),
                        ),
                      ),
                      baseColor: Color(0xFFcccccc),
                      highlightColor: Color(0xFFffffff)),
                )
              ]),
            ),
            Container(
              width: 95.0,
              height: 150.0,
              padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
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
                Shimmer.fromColors(
                  baseColor: Color(0xFFeeeeee),
                  highlightColor: Color(0xFFffffff),
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle, color: Color(0xFFeeeeee)),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                SizedBox(
                    width: 120.0,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                      child: Shimmer.fromColors(
                          child: Container(
                            height: 18,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2.5),
                              color: Color(0xFFeeeeee),
                            ),
                          ),
                          baseColor: Color(0xFFcccccc),
                          highlightColor: Color(0xFFffffff)),
                    )),
                SizedBox(
                  height: 5,
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                  child: Shimmer.fromColors(
                      child: Container(
                        height: 10,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(2.5),
                          color: Color(0xFFeeeeee),
                        ),
                      ),
                      baseColor: Color(0xFFcccccc),
                      highlightColor: Color(0xFFffffff)),
                )
              ]),
            ),
            Container(
              width: 95.0,
              height: 150.0,
              padding: EdgeInsets.fromLTRB(0, 20, 0, 20),
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
                Shimmer.fromColors(
                  baseColor: Color(0xFFeeeeee),
                  highlightColor: Color(0xFFffffff),
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle, color: Color(0xFFeeeeee)),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                SizedBox(
                    width: 120.0,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                      child: Shimmer.fromColors(
                          child: Container(
                            height: 18,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(2.5),
                              color: Color(0xFFeeeeee),
                            ),
                          ),
                          baseColor: Color(0xFFcccccc),
                          highlightColor: Color(0xFFffffff)),
                    )),
                SizedBox(
                  height: 5,
                ),
                Padding(
                  padding: const EdgeInsets.fromLTRB(7.5, 0, 7.5, 0),
                  child: Shimmer.fromColors(
                      child: Container(
                        height: 10,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(2.5),
                          color: Color(0xFFeeeeee),
                        ),
                      ),
                      baseColor: Color(0xFFcccccc),
                      highlightColor: Color(0xFFffffff)),
                )
              ]),
            ),
          ]),
    );
  }
}
