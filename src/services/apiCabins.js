import supabase from "./supabase";
const PAGE_SIZE = 10;
export async function getBookings(
  filterField,
  { sortKey, sortDirection },
  page
) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });
  //Filter
  if (filterField.value !== "all") {
    query = query.eq(filterField.field, filterField.value);
  }

  // Sort
  query = query.order(sortKey, { ascending: sortDirection === "asc" });
  //Paginate
  const start = (page - 1) * PAGE_SIZE
  const end = page * PAGE_SIZE - 1
  query = query.range(start, end)

  let { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  return {data, count};
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(data) {
  const isEditSession = Boolean(data.id);

  const imageName = `${Math.random()}-${data.image.name}`.replaceAll("/", "");
  const imagePath =
    typeof data.image === "string"
      ? data.image
      : `https://xmhiiwvefgaypdihybxy.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  const { res, error } = isEditSession
    ? await query
        .update({ ...data, image: imagePath })
        .eq("id", data.id)
        .select()
        .single()
    : await query.insert([{ ...data, image: imagePath }]);
  // 2. Upload image
  if (error) {
    console.error("error", error);
    throw new Error("Cabins could not be added.");
  }
  let storageError;
  if (typeof data.image !== "string") {
    const { error } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, data.image, { cacheControl: "3600", upsert: false });
    storageError = error;
  }

  if (data.image.type !== "string" && storageError) {
    deleteCabin(res.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded.So, cabin is not created."
    );
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
}
