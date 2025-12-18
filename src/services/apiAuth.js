import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error("Invalid login credentials");
  }
  return data;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("could not logout");
    throw new Error("Could not logout");
  }
}

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });
  if (error) throw new Error("User could not be created");
  return data;
}

export async function updateUser({ fullName, password, avatar }) {
  let updateData;
  if (password) {
    updateData = { data: { password }};
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }
  if (!updateData) return;


  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("User could not be updated");

  if (!avatar) return data;
  
  const fileName = `avatar-${data.user.id}-${Math.random()}-${avatar.name}`;
  

  const {error: storageError} = await supabase.storage.from('avatars').upload(fileName, avatar, { cacheControl: "3600", upsert: false })
  if (storageError) throw new Error('Could not upload image')
    const url = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`

    const {data: updateduser, error: userError} = await supabase.auth.updateUser({data:{avatar:url}})

  if (userError) throw new Error('Error getting the user');

  return updateduser;
}


const abc = 'https://xmhiiwvefgaypdihybxy.supabase.co/storage/v1/object/cabin-images/0.4350188821400295-cabin-001.jpg'