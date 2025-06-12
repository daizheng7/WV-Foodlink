import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const Proposal = () => {
  const theme = useTheme();

  const sectionStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: { xs: 2, sm: 3, md: 4 },
    fontFamily: "'Source Sans Pro', sans-serif",
    color: "#333",
    lineHeight: 1.75,
    fontSize: { xs: "1rem", sm: "1.05rem" },
  };

  const headingStyle = {
    color: "#002855",
    fontWeight: "bold",
    mt: 4,
    mb: 2,
    fontSize: { xs: "1.5rem", sm: "1.75rem" },
  };

  const subHeadingStyle = {
    color: "#004990",
    fontWeight: "bold",
    mt: 3,
    mb: 1,
    fontSize: { xs: "1.25rem", sm: "1.5rem" },
  };

  const listItemStyle = {
    mb: 1.5,
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 3, md: 6 }, py: 4 }}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Typography
          variant="h1"
          className="text-wvu-blue display-3 wvu-bar wvu-bar--center wvu-bar--bottom wvu-shout"
          sx={{
            fontSize: { xs: "2rem", sm: "2.4rem" },
            textAlign: "center",
            mb: 4,
            color: "#002855",
          }}
        >
          Proposal for a West Virginia Office of Community Food Security
        </Typography>

        <Box sx={sectionStyle}>
          <Typography sx={headingStyle}>Rationale</Typography>
          <Typography paragraph>
            National food and nutrition policies are designed on behalf of agricultural and food industry interests far beyond our borders and West Virginia’s food system is thus dependent on political and economic forces over which we have very little control. We have one of the highest food insecurity rates in the country, yet despite over $700 million worth of federal food assistance disbursed in various forms across the state last year, accessing nutritious food on a regular basis remains difficult for many of our neighbors.
          </Typography>
          <Typography paragraph>
            15 different federal nutrition assistance programs are administered by four separate state administrative agencies. These are siloed and lack the integration necessary to maximize their effectiveness at the local level, both in terms of their contribution to our state’s economy, and the well-being of our communities.
          </Typography>
          <Typography paragraph>
            Most of this nutrition assistance funding is captured by out-of-state businesses who prioritize their bottom line and do not adequately invest in the prosperity of our communities. Ad hoc support for community driven food access initiatives such as SNAP stretch, produce prescription programs, farmer’s markets, locally owned grocery stores, food hubs, backpack, senior and emergency food programs are all dependent on intermittent and competitive funding. It is thus difficult for the organizations administering these programs, and the public officials working to improve food access across their jurisdictions, to engage in long-term planning around community food security in the state.
          </Typography>

          <Typography sx={headingStyle}>What is Community Food Security?</Typography>
          <Typography paragraph>
            Community Food Security (CFS) goes beyond short-term food assistance by leveraging the local knowledge of households facing food insecurity alongside the organizational capacity of diverse food system stakeholders to re-shape food environments and enhance access to nutritious foods. CFS prioritizes the integration of public nutrition assistance programs with the development of local food systems, leveraging anti-hunger programs to advance community development goals. This systems-based approach confronts barriers to food access at different scales and jurisdictions (neighborhood, city, county, state) through collaborative, multi-sectoral food system planning that address the underlying causes of hunger and food insecurity.
          </Typography>

          <Typography sx={headingStyle}>Office Mandate</Typography>
          <Typography paragraph>
            Establish an Office of Community Food Security (OCFS) to coordinate anti-hunger programs across West Virginia and leverage public nutrition assistance funding to support the development and long-term viability of the state’s food and farm economy. The office would:
          </Typography>
          <Typography component="ol" sx={{ pl: 3 }}>
            {[
              "Work directly with low-income households to prioritize their long-term nutrition and food access needs.",
              "Support the development of multi-sectoral community food security plans at the municipal and county level that integrate with state-level nutrition assistance and community food security investments.",
              "Maintain and regularly update a data repository of all state administered nutrition assistance programs to serve the information needs of municipalities, counties, school districts, hunger relief organizations, food and farm businesses, agriculture development organizations, social service and healthcare providers, academic researchers and other stakeholders engaged in advancing community food security initiatives.",
              "Support grant application processes related to community food security for in-state providers and state departments.",
              "Coordinate communication with and between public agencies administering nutrition assistance programs, private businesses and non-profit organizations engaged in improving food access (e.g. food banks).",
              "Collaborate with research organizations and universities to monitor ongoing gap analysis and identify areas underserved by current programs.",
              "Collaborate with state and community partners to integrate public nutrition assistance programming with emergent food system development opportunities.",
              "Invest in community food system projects that improve access to food while enhancing the viability of West Virginia’s food and farm sector.",
              "Provide support in coordinating assistance to address food insecurity during federal or state declared emergencies."
            ].map((text, index) => (
              <Typography key={index} component="li" sx={listItemStyle}>
                {text}
              </Typography>
            ))}
          </Typography>

          <Typography sx={headingStyle}>Proposed Office Structure</Typography>
          <Typography paragraph>
            The Office of Community Food Security shall coordinate nutrition assistance programs currently administered across multiple state agencies and foster the development of county level community food security plans that leverage federal, state and local funds to enhance access to food produced, processed and sold in West Virginia.
          </Typography>
          <Typography paragraph>
            Building on the work of the State Nutrition Action Councils and the coordinating role of the state’s SNAP-Education grant the office shall be advised by a board representing persons directly benefiting from state nutrition assistance programs, emergency food agencies, Family Resource Networks, WV farmers, WV owned retailers, agriculture and nutrition extension agents, food system researchers and all representatives from state agencies currently administering nutrition assistance programs including WVDHHR, WVDE, WVDA and the Bureau of Senior Services.
          </Typography>
          <Typography paragraph>
            The Office shall have the requisite budget to invest in and support the long-term development of community food security plans and hire staff to facilitate their coordination and implementation at the county level. The Office of Community Food Security shall collaborate closely with West Virginia’s SNAP-Ed implementing agency and its partners to deliver programming, coordinate staffing and enhance food policy, systems and environment change across the state.
          </Typography>

          <Typography sx={headingStyle}>Proposed Budget – $15,000,000 (yearly)</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography sx={subHeadingStyle}>Office administration: $500,000</Typography>
            <Typography paragraph>
              Program director, assistance staff, monitoring, evaluation and travel.
            </Typography>

            <Typography sx={subHeadingStyle}>Community Food Security Field Staff: $4,500,000</Typography>
            <Typography paragraph>
              55 county level community food security coordinators with annual salary of $50,000 + fringe and overhead.
            </Typography>

            <Typography sx={subHeadingStyle}>Community Food Security Matching Fund: $10,000,000</Typography>
            <Typography paragraph>
              Invest in initiatives that promote a strong and equitable local and regional food economies while directly addressing the severe impacts of food insecurity, particularly among low-income communities facing food access barriers.
            </Typography>
            <Typography paragraph>
              The Office of Community Food Security will design and administer a matching grant program through its community food security field staff at the county scale. These grants would prioritize public-private partnerships that foster state-wide, regional and local CFS initiatives including initiatives such as SNAP stretch, community owned grocers’ stores, K-12 nutrition enhancement, produce prescription programs, emergency food network infrastructure and community food hub development.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Proposal;
