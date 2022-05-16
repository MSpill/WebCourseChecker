const fetch = require("node-fetch");

const url = (term, CRN) =>
  `https://oscar.gatech.edu/bprod/bwckschd.p_disp_detail_sched?term_in=${term}&crn_in=${CRN}`;
async function lookupCourseName(term, CRN) {
  const data = await fetch(url(term, CRN), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
    },
  });
  const text = await data.text();
  const lines = text.split("\n");
  const nameLine =
    lines.indexOf(
      '<table  CLASS="datadisplaytable" SUMMARY="This table is used to present the detailed class information." width="100%"><caption class="captiontext">Detailed Class Information</caption>'
    ) + 2;
  if (nameLine === 1) {
    throw "Course does not exist";
  }
  return lines[nameLine].split(">")[1].split("<")[0];
}
exports.lookupCourseName = lookupCourseName;
