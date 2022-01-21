import axios from 'axios';
import './BusDropdown.css';
import { useEffect, useState } from 'react';
import BusDropdown from './BusDropdown';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import useInterval from 'react-useinterval';

export default function BusTimes(props) {
  const [GTFS, setGTFS] = useState([]);
  const times = useSelector((state) => state.stopResults.times);

  let uniqueIdCount = 0;
  function uniqueId() {
    uniqueIdCount += 1;
    return uniqueIdCount;
  }

  const refreshData = () => {
    axios
      .get('http://localhost:8080/api/trips', {
        params: {
          stop_id: times.stop_id,
          route_id: times.route_id,
        },
      })
      .then((response) => {
        let parsedFeeds = JSON.parse(response.data);
        setGTFS(parsedFeeds);
      });
  };

  useEffect(() => {
    setGTFS([]);
    refreshData(true);
  }, [times]);

  useInterval(refreshData, 30000);

  let busTimes = GTFS.map((data) => {
    return (
      <BusDropdown
        key={uniqueId()}
        stop_id={data.stopId}
        trip_id={data.tripId}
        route_id={data.routeId}
        route_name={times.route_name}
        time={data.time}
        vehicle_id={data.vehicleID}
      />
    );
  });

  return (
    <>
      {busTimes.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Route</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <>{busTimes}</>
          </Table>
        </TableContainer>
      ) : (
        <>
          <Table></Table>
          {times.stop_id && <CircularProgress sx={{ my: 1 }} />}
        </>
      )}
    </>
  );
}
