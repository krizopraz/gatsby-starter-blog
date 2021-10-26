import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/blogLayout"
import Seo from "../components/blogSeo"
import client from "../db/supabase"

function YorumYap ({postId,actions}){
  const [icerik, setIcerik] = React.useState('')
  if(client.auth.session() === undefined ||client.auth.session() === null ) return <span>Yorum yapabilmek için <Link to='/girisyap'>Giriş yapmalısınız</Link>.Kayıt olmak için <Link to='/kayitol'>buraya tıklayın</Link>.</span>
  function handle(){
    (async ()=>{
      try {
        const { data,error} = await client.from('yorumlar').insert([{icerik,aitlik_id:postId,kullanici_id:client.auth.user().id,}])
        if(error) throw error
        actions.setYorumlar(actions.yorumlar.concat(data))
        setIcerik('')
      } catch (error) {
      }
    })()
  }
  return(
    <>
      <form onSubmit={(e)=>{e.preventDefault();handle(e)}} >
        <input onChange={(event)=>{setIcerik(event.target.value)}} value={icerik} type="text" placeholder="Herkese açık bir yorum ekle..." name="yorum" id="yorumyap" />
        <button type="submit">Gönder</button>
      </form>
    </>
  )
}

function Comments ({postId}) {
  const [yorumlar, setYorumlar] = React.useState([])
 
  React.useEffect(()=>{
    const getirYorumlar = async ()=>{
      try {
        const {data,error} = await client.from('yorumlar').select().eq('aitlik_id',postId)
        if(error)throw error
        setYorumlar(data)
      } catch (error) {
        //console.log(error)
      }
    }
    getirYorumlar()
  },[])
  //console.log(yorumlar)
  if(yorumlar ==null){
    return (
    <>
      <YorumYap postId={postId} actions={{yorumlar,setYorumlar}}/>
      <span>Yorum Bulunamadı. İlk yorumu atmaya ne dersin ? </span>
    </>
    )
  }
  return(
    <div >
      <h3>Yorumlar</h3>
      <YorumYap postId={postId} actions={{yorumlar,setYorumlar}}/>
      <ul>
        {yorumlar.length === 0 ? <span>Yorum Bulunamadı. İlk yorumu atmaya ne dersin ? </span> : yorumlar.map((comment)=>{
          return(
            <li key={comment.id}>
                <p>{comment.icerik}</p>
                <span>{comment.zaman}</span>
            </li>
          )
        }) }
      </ul>
    </div>
  )
}

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  console.log(data)
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>

          <Comments postId={post.id} />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/blog" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/blog" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
