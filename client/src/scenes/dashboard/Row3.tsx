import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts';

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } =  useGetKpisQuery();
  const { data: productData } =  useGetProductsQuery();
  const { data: transactionData } =  useGetTransactionsQuery();
  
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses/100 - value/100
            }
          ]
        }
      )
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      valueGetter: (value: { value: number; }) => `$${value.value/100}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      valueGetter: (value: { value: number; }) => `$${value.value/100}`,
    }
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "Id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      type: 'string',
      valueGetter: (value: { value: number; }) => `$${value.value/100}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.2,
      rendercell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ]


  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" subTitle='' sideText={`${productData?.length} products`} />
        <Box 
          mt="0.5rem" 
          p="0 0.5rem" 
          height="75%" 
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden"
            },
          }}>
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
      <BoxHeader title="Recent Orders" subTitle='' sideText={`${transactionData?.length} latest transctions`} />
        <Box 
          mt="1rem" 
          p="0 0.5rem" 
          height="80%" 
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden"
            },
          }}>
          <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
            getRowId={(row) => row._id}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" subTitle="" sideText="+4%" />
        <FlexBetween mt="0.3rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => 
            <Box key={`${data[0].name}-${i}`}>
              <PieChart
                width={90} 
                height={80}
                >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          )}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
          subTitle=""
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas molestie volutpat et.
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3