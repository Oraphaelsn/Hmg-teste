import React from 'react';

// Componentes semânticos para melhorar SEO
export const MainContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <main className={className} role="main" aria-label="Conteúdo principal">
    {children}
  </main>
);

export const SectionContent: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  ariaLabel?: string;
  id?: string;
}> = ({ children, className, ariaLabel, id }) => (
  <section className={className} aria-label={ariaLabel} id={id}>
    {children}
  </section>
);

export const HeaderContent: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}> = ({ children, className, level = 1 }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <HeadingTag className={className}>
      {children}
    </HeadingTag>
  );
};

export const NavContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <nav className={className} role="navigation" aria-label="Navegação principal">
    {children}
  </nav>
);

export const AsideContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <aside className={className} role="complementary">
    {children}
  </aside>
);

export const ArticleContent: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  title?: string;
}> = ({ children, className, title }) => (
  <article className={className} itemScope itemType="https://schema.org/Article">
    {title && <meta itemProp="headline" content={title} />}
    {children}
  </article>
);

// Componente para breadcrumbs
export const BreadcrumbNavigation: React.FC<{ items: Array<{ name: string; href?: string }> }> = ({ items }) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map((item, index) => (
        <li key={index} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          {item.href ? (
            <a 
              href={item.href} 
              className="hover:text-[#2c744c] transition-colors"
              itemProp="item"
            >
              <span itemProp="name">{item.name}</span>
            </a>
          ) : (
            <span className="text-[#2c744c] font-medium" itemProp="name">{item.name}</span>
          )}
          <meta itemProp="position" content={(index + 1).toString()} />
          {index < items.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

// Componente para informações de contato estruturadas
export const ContactInfo: React.FC<{
  phone?: string;
  email?: string;
  address?: string;
  className?: string;
}> = ({ phone, email, address, className }) => (
  <div className={className} itemScope itemType="https://schema.org/ContactPoint">
    {phone && (
      <div className="flex items-center space-x-2">
        <span>Telefone:</span>
        <a 
          href={`tel:${phone}`} 
          className="text-[#2c744c] hover:underline"
          itemProp="telephone"
        >
          {phone}
        </a>
      </div>
    )}
    {email && (
      <div className="flex items-center space-x-2">
        <span>Email:</span>
        <a 
          href={`mailto:${email}`} 
          className="text-[#2c744c] hover:underline"
          itemProp="email"
        >
          {email}
        </a>
      </div>
    )}
    {address && (
      <div className="flex items-center space-x-2">
        <span>Endereço:</span>
        <span itemProp="address">{address}</span>
      </div>
    )}
  </div>
);

// Componente para serviços médicos estruturados
export const MedicalService: React.FC<{
  name: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}> = ({ name, description, children, className }) => (
  <div className={className} itemScope itemType="https://schema.org/MedicalTherapy">
    <meta itemProp="name" content={name} />
    <meta itemProp="description" content={description} />
    {children}
  </div>
);

// Componente para depoimentos estruturados
export const TestimonialItem: React.FC<{
  text: string;
  author: string;
  rating?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ text, author, rating, className, children }) => (
  <div className={className} itemScope itemType="https://schema.org/Review">
    <meta itemProp="reviewBody" content={text} />
    <div itemScope itemType="https://schema.org/Person" itemProp="author">
      <meta itemProp="name" content={author} />
    </div>
    {rating && (
      <div itemScope itemType="https://schema.org/Rating" itemProp="reviewRating">
        <meta itemProp="ratingValue" content={rating.toString()} />
        <meta itemProp="bestRating" content="5" />
      </div>
    )}
    {children}
  </div>
);