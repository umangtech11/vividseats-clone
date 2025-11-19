export async function fetchEvents(keyword = "", city = "", sort = "", page = 0) {
  const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

  const URL =
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}` +
    `&keyword=${keyword}` +
    `&city=${city}` +
    `&sort=${sort}` +
    `&page=${page}` +
    `&size=20`;

  console.log("Requesting:", URL); // debug

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      console.error("Event list API error:", res.status);
      return [];
    }

    const data = await res.json();
    return data._embedded?.events || [];
  } catch (err) {
    console.error("fetchEvents error:", err);
    return [];
  }
}

export async function fetchEventDetails(id) {
  const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

  const URL = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`;

  try {
    const res = await fetch(URL);

    if (!res.ok) {
      console.error("Event details API error:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchEventDetails error:", err);
    return null;
  }
}
